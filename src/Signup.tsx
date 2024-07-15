import type React from "react";
import { useState } from "react";

interface SignupProps {
  onSubmit: (name: string, password: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(name, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label  htmlFor={name}>おなまえ</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label htmlFor={password}>おまじない</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">とうろくする</button>
    </form>
  );
};

export default Signup;
