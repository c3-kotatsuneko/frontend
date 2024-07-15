import type React from "react";
import "./welcome.css";
import Tab from "./Tab";
import Login from "./Login";
import Signup from "./Signup";

interface WelcomeProps {
  onLoginSubmit: (name: string, password: string) => void;
  onSignupSubmit: (name: string, password: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLoginSubmit, onSignupSubmit }) => {
  return (
    <div className="welcome-body">
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
