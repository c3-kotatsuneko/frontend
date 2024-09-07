import { useEffect } from "react";
import { DefaultButton } from "../../components/ui/Button";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

const position = "front";

export const PlayStart = () => {
	const navigate = useNavigate();

	useEffect(() => {
		document.getElementById("arjs-video")?.remove();
	}, []);

	return (
		<main className={styles.root}>
			<p className={styles["start-message"]}>みんなあつまったかな？</p>
			<DefaultButton
				color="redorange"
				size="lg"
				onClick={() => navigate(`/play_multi?position=${position}`)}
			>
				げーむ すたーと！
			</DefaultButton>
			<img
				className={styles["cats-image"]}
				alt="丸ねこタワー"
				src="/cats/catsTower-circle.webp"
				width={148}
				height={242}
			/>
		</main>
	);
};
