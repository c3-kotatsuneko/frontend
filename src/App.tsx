import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import { LoadingPage } from "./Loading";
import { GuestLoginPage } from "./GuestLogin";
import { ModeSelectPage } from "./ModeSelect";
import "./App.css";

function AppRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/loading" element={<LoadingPage />} />
				<Route path="/guest-login" element={<GuestLoginPage />} />
				<Route path="/mode-select" element={<ModeSelectPage />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
