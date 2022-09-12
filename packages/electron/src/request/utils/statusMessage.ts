const statusMassageMapping = new Map<number, string>([
	[100, 'Continue'],
	[101, 'SwitchProtocols'],
	[102, 'Processing'],
	[103, 'EarlyHints'],
	//success
	[200, 'OK'],
	[201, 'Created'],
	[202, 'Accepted'],
	[203, 'NonAuthInfo'],
	[204, 'NoContent'],
	[205, 'ResetContent'],
	[206, 'PartialContent'],
	//redirection
	[300, 'MultipleChoice'],
	[301, 'MovedPermanently'],
	[302, 'Found'],
	[303, 'SeeOther'],
	[304, 'NotModified'],
	[305, 'UseProxy'],
	[306, 'SwitchProxy'],
	[307, 'TemporaryRedirect'],
	[308, 'Permanent Redirect'],
	//client
	[400, 'Bad Request'],
	[401, 'Unauthorized'],
	[402, 'Payment Required'],
	[403, 'Forbidden'],
	[404, 'NotFound'],
	[405, 'MethodNotAllowed'],
	[406, 'NotAcceptable'],
	[407, 'ProxyAuth'],
	[408, 'RequestTimeout'],
	[409, 'Conflict'],
	[410, 'Gone'],
	//server
	[500, 'Server Error'],
	[501, 'NotImplemented'],
	[502, 'BadGateway'],
	[503, 'ServiceUnavailable'],
	[504, 'GatewayTimeout'],
	[505, 'HTTPVersion']
]);

export const getStatusMassage = (statusCode: number) => {
	const existDesc = statusMassageMapping.get(statusCode);
	if (existDesc) {
		return existDesc;
	} else {
		return 'Unknown';
	}
};
