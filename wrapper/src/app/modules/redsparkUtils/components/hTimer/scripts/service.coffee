angular.module 'hAnalytics.services'
.service 'hTimer', ()->

  return API = {
    timers: {}
    getTime: (name)->
      time = -1
      if API.timers[name]?.started?
        if !API.timers[name].stopped?
          API.stop(name)

        time = API.timers[name].stopped - API.timers[name].started
      return time

    start: (name)->
      API.timers[name] =
        started: new Date().getTime()

    stop: (name, reset)->
      if API.timers[name]?
        API.timers[name].stopped = new Date().getTime()

      time = API.getTime(name)
      if reset
        API.start(name)

      return time


  }
