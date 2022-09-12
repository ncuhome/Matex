export const includeOneOf = <T extends string>(target: string, strArr: T[]) => {
  let flag = false;
  strArr.forEach((str) => {
    if (target.includes(str)) {
      flag = true;
    }
  });
	return flag;
};
