import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App";
import "./index.css";
import Layout from "./layout";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
//pathがarの時は読み込まない
const root = document.getElementById("root");
const url = location.pathname;
if (url !== "/ar") {
  if (root) {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <BrowserRouter>
          <Layout>
            <AppRoutes />
          </Layout>
        </BrowserRouter>
      </React.StrictMode>
    );
  }
} else {
  //rootを削除
  if (root) {
    root.remove();
  }
}
