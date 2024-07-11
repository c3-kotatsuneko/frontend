import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <footer>
        <p>Created by こたつねこ</p>
      </footer>
    </div>
  );
};

export default Layout;
