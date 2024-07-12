import React, { useState } from "react";
import "./tabs.css";

interface TabProps {
  labels: string[];
  contents: React.ReactNode[];
}

const Tab: React.FC<TabProps> = ({ labels, contents }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs">
      <ul className="tab__btn">
        {labels.map((label, index) => (
          <li
            key={index}
            className={`tab__name tab__name--${index === 0 ? 'one' : 'two'} ${index === activeTab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            {label}
          </li>
        ))}
      </ul>
      <div className={`tab__content tab__content--${activeTab === 0 ? 'one' : 'two'}`}>
        {contents[activeTab]}
      </div>
    </div>
  );
};

export default Tab;
