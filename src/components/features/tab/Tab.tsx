import type React from "react";
import { useState } from "react";
import "./tabs.css";

interface TabProps {
	labels: string[];
	id: string;
	contents: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({ labels, contents, id }) => {
	const [activeTab, setActiveTab] = useState(0);
	return (
		<div className="tabs">
			<ul className="tab-btn">
				{labels.map((label, index) => (
					<li
						key={`${id + index}`}
						className={`tab-name tab-name-${index === 0 ? "one" : "two"} ${index === activeTab ? "is-active" : ""}`}
						onClick={() => setActiveTab(index)}
						onKeyDown={() => {}}
					>
						{label}
					</li>
				))}
			</ul>
			<div
				className={`tab-content tab-content-${activeTab === 0 ? "one" : "two"}`}
			>
				{contents[activeTab]}
			</div>
		</div>
	);
};

export default Tab;
