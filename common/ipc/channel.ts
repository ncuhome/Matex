export enum ApiTest_Channel {
  Request = 'ApiTest_Request',
  ReqError = 'ApiTest_Request_error',
  Response = 'ApiTest_Response'
}

export enum Global_Channel {
  TrafficLights = 'Global_TrafficLights'
}

export enum Update_Channel {
  AfterCheck = 'after-check',
  StartDownload = 'start-download',
  DownloadProgress = 'download-progress',
  UpdateDownloaded = 'update-downloaded',
  RelaunchDelay = 'relaunch-delay',
  CancelUpdate = 'cancel-update',
  UpdateCanceled = 'update-canceled'
}
