import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import { LoadingPage } from "./Loading";
import { CreditFooter } from "./components/ui/CreditFooter";
import "./App.css";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<CreditFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
