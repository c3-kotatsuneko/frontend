import React from "react";
import Tab from "./Tab";
import Login from "./Login";
import Signup from "./Signup";
import "./welcome.css";

interface WelcomeProps {
  onLoginSubmit: (name: string, password: string) => void;
  onSignupSubmit: (name: string, password: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLoginSubmit, onSignupSubmit }) => {
  return (
    <div className="welcome_body">
      <h2>ばーちゃるぼっくす</h2>
      <Tab
        labels={["ろぐいん", "とうろく"]}
        contents={[
          <Login key="login" onSubmit={onLoginSubmit} />,
          <Signup key="signup" onSubmit={onSignupSubmit} />
        ]}
      />
    </div>
  );
};

export default Welcome;
