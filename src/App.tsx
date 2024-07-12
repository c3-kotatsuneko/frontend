import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import AR from "./AR";
import "./App.css";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ar" element={<AR />} />
      </Routes>
    </>
  );
}

export default AppRoutes;