import type React from "react";
import { useState } from "react";
import "./tabs.css";

interface TabProps {
	labels: string[];
	contents: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({ labels, contents }) => {
	const [activeTab, setActiveTab] = useState(0);

	return (
		<div className="tabs">
			<ul className="tab-btn">
				{labels.map((label, index) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<li
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={index}
						className={`tab-name tab-name--${index === 0 ? "one" : "two"} ${index === activeTab ? "is-active" : ""}`}
						onClick={() => setActiveTab(index)}
					>
						{label}
					</li>
				))}
			</ul>
			<div
				className={`tab__content tab__content--${activeTab === 0 ? "one" : "two"}`}
			>
				{contents[activeTab]}
			</div>
		</div>
	);
};

export default Tab;
