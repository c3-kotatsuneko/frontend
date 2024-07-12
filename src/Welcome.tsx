import React, { useState } from "react";
import "./welcome.css";

interface LoginProps {
  onSubmit: (email: string, password: string) => void;
}

const Welcome: React.FC<LoginProps> = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="welcome_body">
      <h2>ばーちゃるぼっくす</h2>
      <form className="welcome_box" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">あそびにいく</button>
        <a href="#">ゲストとしてあそびにいく</a>
      </form>
    </div>
  );
}

export default Welcome;
