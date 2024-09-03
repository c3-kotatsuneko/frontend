import { useEffect, useState } from "react";

// TODO: backendが実装されたら、1秒ごとにサーバーにリクエストを送るように変更する?
export const useCountTimer = (initialTime: number) => {
	const [time, setTime] = useState(initialTime);

	useEffect(() => {
		const countDownInterval = setInterval(() => {
			if (time === 0) {
				clearInterval(countDownInterval);
			} else if (time > 0) {
				setTime(time - 1);
			}
		}, 1000);
		return () => {
			clearInterval(countDownInterval);
		};
	}, [time]);

	return { time };
};
