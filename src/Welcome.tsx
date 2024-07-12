import React from "react";
import "./welcome.css";

function Welcome() {
  return (
    <div className="welcome_body">
      <h2>ばーちゃるぼっくす</h2>
      <div className="welcome_box">
        <h1>Name</h1>
        <h1>Password</h1>
        <button>あそびにいく</button>
        <a>ゲストとしてあそびにいく</a>
      </div>
    </div>
  );
}

export default Welcome;
