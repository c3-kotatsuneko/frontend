import type React from "react";
import { useState } from "react";
import clsx from "clsx";
import styles from "./index.module.css";

interface TabProps {
	labels: string[];
	id: string;
	contents: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({ labels, contents, id }) => {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<div className={styles.tabs}>
			<ul className={styles["tab-btn"]}>
				{labels.map((label, index) => (
					<li
						key={`${id + index}`}
						className={clsx(
							styles["tab-name"],
							styles[`tab-name-${index === 0 ? "one" : "two"}`],
							index === activeTab && styles["is-active"],
						)}
						onClick={() => setActiveTab(index)}
						onKeyDown={() => {}}
					>
						{label}
					</li>
				))}
			</ul>
			<div
				className={clsx(
					styles["tab-content"],
					styles[`tab-content-${activeTab === 0 ? "one" : "two"}`],
				)}
			>
				{contents[activeTab]}
			</div>
		</div>
	);
};

export default Tab;
