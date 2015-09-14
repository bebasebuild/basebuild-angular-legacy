
# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildWrapper'

  # =============================================
  # Config Twain
  # =============================================
  .config (hAnalyticsTrackersProvider, APP_ENV) ->
    hAnalyticsTrackersProvider.set {
      main:
        versionDimension: APP_ENV.GA.VERSION_DIMENSION
        UA: APP_ENV.GA.MAIN
    }