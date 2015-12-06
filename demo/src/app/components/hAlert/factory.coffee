angular.module('BaseBuildWrapper.factories')
.factory 'hAlert', ($timeout, SweetAlert, $window) ->

  return alert = {
    close: ->
      $timeout ->
        swal.close()

    open: (options = {}, fn) ->
      config =
        type: 'info'
        title: 'Processando...'
        text: 'Por favor aguarde.'
        showCancelButton: false
        cancelButtonText: "Cancelar"
        confirmButtonColor: '#2196f3'
        confirmButtonText: 'Ok'
        closeOnConfirm: !fn?

      config = $.extend(true, config, options)

      $timeout ->
        SweetAlert.swal(config, fn)

    showInputError: (message) ->
      $window.swal.showInputError(message)

    success: (options = {}, fn)->
      config =
        type: 'success'


      alert.open($.extend(true, config, options), fn)

    error: (options = {}, fn)->
      config =
        title: 'Ops!'
        text: 'Um erro inesperado ocorreu, por favor tente novamente.'
        type: 'error'
        showConfirmButton: true
        closeOnConfirm: true

      alert.open($.extend(true, config, options), fn)

    warning: (options = {}, fn)->
      config =
        title: 'Ops!'
        type: 'warning'

      $timeout ->
        alert.open($.extend(true, config, options), fn)

    info: (options = {}, fn)->
      config =
        type: 'info'
        showCancelButton: false
        showConfirmButton: false

      alert.open($.extend(true, config, options), fn)

    confirm: (options = {}, fn)->
      config =
        title: "Tem certeza?"
        text: "Por favor confirme antes de continuar."
        showCancelButton: true
        confirmButtonColor: "#d84242"
        confirmButtonText: "Sim, continuar."

      alert.open($.extend(true, config, options), fn)

    input: (options = {}, fn)->
      config =
        title: ""
        type: "input"
        text: ""
        showCancelButton: yes
        confirmButtonColor: "#2196f3"
        confirmButtonText: "Ok"

      alert.open($.extend(yes, config, options), fn)


  }

