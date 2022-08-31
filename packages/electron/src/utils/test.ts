export const test =  async () => {
  const Got =(await import('got')).default;
	const res = await Got.get('http://159.75.220.253:7888/img/test.jpg');
	console.log(res);
};
