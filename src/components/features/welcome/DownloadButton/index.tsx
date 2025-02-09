import { TextButton } from "../../../ui/TextButton";
import styles from "./index.module.css";
import { handleDownload } from "../../../../utils/downloads";

export const DownloadButton: React.FC = () => {
	return (
		<TextButton className={styles["button-container"]} onClick={handleDownload}>
			マーカーダウンロード
			<img
				src="/download.svg"
				alt="Download Icon"
				width="24"
				height="24"
				className={styles.icon}
			/>
		</TextButton>
	);
};
