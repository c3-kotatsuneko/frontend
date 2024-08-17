import { useEffect } from "react";

// TODO: backendが実装されたら、1秒ごとにサーバーにリクエストを送るように変更する?
export const useCountTimer = (time: number, setTime: (arg: number) => void) => {
	useEffect(() => {
		const countDownInterval = setInterval(() => {
			if (time === 0) {
				clearInterval(countDownInterval);
			}
			if (time && time > 0) {
				setTime(time - 1);
			}
		}, 1000);
		return () => {
			clearInterval(countDownInterval);
		};
	}, [setTime, time]);
};
