
interface TestProps{
	speed:number;
	costTime:number
}

export const testDownloadSpeed = ():Promise<TestProps> => {
	const url = 'http://159.75.220.253:7888/img/test.jpg';
	const size = 2150
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.src = `${url}?_t=${Math.random()}` // 加个时间戳以避免浏览器只发起一次请求
		const startTime = (new Date()).getTime()
		img.onload = function () {
			const fileSize = size // 单位是 kb
			const endTime = (new Date()).getTime()
			const costTime = (endTime - startTime) / 1000
			const speed = fileSize / costTime // 单位是 kb/s
			resolve({ speed, costTime })
		}

		img.onerror = reject
	})
}
