import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import { LoadingPage } from "./Loading";
import "./App.css";

function AppRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/loading" element={<LoadingPage />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
