angular.module 'hAnalytics.services'
.service 'hGATracker', (hAnalyticsTrackers, hTimer, $window)->

  return API = {
    ga:
      send: (tracker, options)->
        try
          $window.ga "#{tracker.name}.send", options
        catch e
          console.log 'hAnalytics.track error', e, tracker

      set: (tracker, options)->
        try
          $window.ga "#{tracker.name}.set", options
        catch e
          console.log 'hAnalytics.track error', e, tracker

    all:
      send: (options)->
        for own key, tracker of hAnalyticsTrackers
          API.ga.send tracker, options

      set: (options)->
        for own key, tracker of hAnalyticsTrackers
          API.ga.set tracker, options

    byName:
      send: (name, options)->
        tracker = hAnalyticsTrackers[name]
        if tracker?
          API.ga.send tracker, options

      set: (name, options)->
        tracker = hAnalyticsTrackers[name]
        if tracker?
          API.ga.set tracker, options

    setUser: (user)->
      API.all.set({userId: "USER_#{user.id}"})

    setPage: (page)->
      API.all.set({page: page})

    setAppVersion: (version, name)->
      options = {}
      if name?
        tracker = hAnalyticsTrackers[name]
        if tracker? and tracker.versionDimension?
          options[tracker.versionDimension] = version
          API.ga.set(tracker, options)
      else
        for own key, tracker of hAnalyticsTrackers
          if tracker.versionDimension?
            options[tracker.versionDimension] = version
            API.ga.set(tracker, options)

    trackEvent: (values, name)->
      hit =
        hitType: 'event'
        eventValue: 1

      $.extend true, hit, values

      if name?
        API.byName.send(name, hit)
      else
        API.all.send(hit)

      if !values.ignoreTiming
        API.trackTiming {
          timingCategory: 'Interactions'
          timingVar: 'UserInteractions'
          timingValue: hTimer.getTime('interactions')
        }

      # restart interactions timer
      hTimer.start('interactions')

    trackView: (values, name)->
      hit =
        hitType: 'pageview'

      $.extend true, hit, values

      if name?
        API.byName.send(name, hit)
      else
        API.all.send(hit)

      API.trackTiming {
        timingCategory: 'Navigation'
        timingVar: 'UserNavigation'
        timingValue: hTimer.getTime('navigation')
      }

      # restart navigation timer
      hTimer.start('navigation')

    trackTiming: (values)->
      hit =
        hitType: 'timing'

      $.extend true, hit, values
      API.all.send hit


  }








