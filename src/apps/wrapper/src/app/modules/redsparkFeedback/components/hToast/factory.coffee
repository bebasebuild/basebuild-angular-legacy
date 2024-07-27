'use strict'

angular.module('hToast.factories')
  .factory 'hToast', ['ngToast', (ngToast) ->

    return {
      alert   : (options = {}) ->
        ngToast.create(options)

      success : (message, options) ->
        @generic('success', message, options)

      info    : (message, options) ->
        @generic('info', message, options)

      warning : (message, options) ->
        @generic('warning', message, options)

      error   : (message, options) ->
        @generic('danger', message, options)

      generic : (className, message, options = {}) ->
        options.content   = message
        options.className = className
        @alert(options)
    }

  ]