import React, { useState } from "react";
import "./welcome.css";
import "./index.css";

interface LoginProps {
  onSubmit: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">あそびにいく</button>
      <a href="#">ゲストとしてあそびにいく</a>
    </form>
  );
};

const Signup: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">とうろくする</button>
    </form>
  );
};

interface WelcomeProps {
  onLoginSubmit: (email: string, password: string) => void;
  onSignupSubmit: (email: string, password: string) => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onLoginSubmit, onSignupSubmit }) => {
  return (
    <div className="welcome_body">
      <h2>ばーちゃるぼっくす</h2>
      <div className="kirikae-tab">
        <div className="tab-wrapper">
          <input id="login" type="radio" name="tab-style" defaultChecked />
          <label className="tab-style" htmlFor="login">
            ろぐいん
          </label>
          <input id="signup" type="radio" name="tab-style" />
          <label className="tab-style" htmlFor="signup">
            とうろく
          </label>
        </div>

        <div className="tab-content-wrapper">
          <div className="tab-content" id="login-content">
            <Login onSubmit={onLoginSubmit} />
          </div>

          <div className="tab-content" id="signup-content">
            <Signup onSubmit={onSignupSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
