import type React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <footer>
        <button onClick={() => console.log("jvbjsgbvubzslrubgvluibeS")}>
          ボタンだよ
        </button>
        <p>Created by こたつねこ</p>
      </footer>
    </div>
  );
};

export default Layout;
