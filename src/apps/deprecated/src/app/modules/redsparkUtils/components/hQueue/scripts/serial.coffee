# =============================================
# Modules
# =============================================
angular.module "hQueue.configs"

# =============================================
# $q.serial ($q decorator)
# =============================================
.config ($provide)->
  $provide.decorator "$q", ($delegate)->

    # code block from http://www.codeducky.org/q-serial/
    #Helper method copied from q.js.
    isPromiseLike = (obj) -> return obj && angular.isFunction(obj.then)

    ###
    # @description Execute a collection of tasks serially.  A task is a function that returns a promise
    #
    # @param {Array.<Function>|Object.<Function>} tasks An array or hash of tasks.  A tasks is a function
    #   that returns a promise.  You can also provide a collection of objects with a success tasks, failure task, and/or notify function
    # @returns {Promise} Returns a single promise that will be resolved or rejected when the last task
    #   has been resolved or rejected.
    ###
    serial = (tasks)->
      #Fake a "previous task" for our initial iteration
      prevPromise = null
      error = new Error()

      angular.forEach tasks, (task, key)->
        success = task.success || task
        fail = task.fail
        notify = task.notify
        nextPromise

        #First task
        if !prevPromise
          nextPromise = success()
          if !isPromiseLike(nextPromise)
            error.message = "Task " + key + " did not return a promise."
            throw error

        else
          nextPromiseSuccess = (data)->
            return data if !success
            ret = success(data)
            if !isPromiseLike(ret)
              error.message = "Task " + key + " did not return a promise."
              throw error

            return ret

          nextPromiseError = (reason)-> #failure
            return $delegate.reject(reason) if !fail
            ret = fail(reason)
            if !isPromiseLike(ret)
              error.message = "Fail for task " + key + " did not return a promise."
              throw error

            return ret

          #Wait until the previous promise has resolved or rejected to execute the next task
          nextPromise = prevPromise.then nextPromiseSuccess, nextPromiseError, notify

        prevPromise = nextPromise
        return

      return prevPromise || $delegate.when()

    $delegate.serial = serial
    return $delegate