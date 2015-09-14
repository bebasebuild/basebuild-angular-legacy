
# =============================================
# Module
# =============================================
angular.module('objectToArray.filters')

  # =============================================
  # Module objectToArray filter
  # =============================================
  .filter 'objectToArray', ()->
    (obj, addKey)->
      return obj if !(obj instanceof Object)

      if addKey is false
        return Object.values(obj)
      else
        return Object.keys(obj).map (key)->
          Object.defineProperty(obj[key], '$key', { enumerable: false, value: key})
