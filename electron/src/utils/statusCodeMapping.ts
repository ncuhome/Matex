const statusCodeMapping = new Map<number, string>([
  [100, 'Continue'],
  [101, 'Switching Protocols'],
  [102, 'Processing'],
  [103, 'Early Hints'],
  //success
  [200, 'OK'],
  [201, 'Created'],
  [202, 'Accepted'],
  [203, 'Non-Authoritative Information'],
  [204, 'No Content'],
  [205, 'Reset Content'],
  [206, 'Partial Content'],
  //redirection
  [300, 'Multiple Choice'],
  [301, 'Moved Permanently'],
  [302, 'Found'],
  [303, 'See Other'],
  [304, 'Not Modified'],
  [305, 'Use Proxy'],
  [306, 'Switch Proxy'],
  [307, 'Temporary Redirect'],
  [308, 'Permanent Redirect'],
  //client
  [400, 'Bad Request'],
  [401, 'Unauthorized'],
  [402, 'Payment Required'],
  [403, 'Forbidden'],
  [404, 'Not Found'],
  [405, 'Method Not Allowed'],
  [406, 'Not Acceptable'],
  [407, 'Proxy Authentication Required'],
  [408, 'Request Timeout'],
  [409, 'Conflict'],
  [410, 'Gone'],
  //server
  [500, 'Server Error'],
  [501, 'Not Implemented'],
  [502, 'Bad Gateway'],
  [503, 'Service Unavailable'],
  [504, 'Gateway Timeout'],
  [505, 'HTTP Version Not'],
  [507, 'HTTP Version Not Supported'],
  [508, 'Loop Detected']
]);

export const getDescription = (statusCode: number) => {
  const existDesc = statusCodeMapping.get(statusCode);
  if (existDesc) {
    return existDesc;
  } else {
    return 'Unknown';
  }
};
