export const toFullWidth = (str: string) => {
	// 半角英数字を全角に変換
	const modifiedStr = str.replace(/[A-Za-z0-9]/g, (s) =>
		String.fromCharCode(s.charCodeAt(0) + 0xfee0),
	);
	return modifiedStr;
};
