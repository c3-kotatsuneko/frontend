import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { LoadingPage } from "./Loading";
import { GuestLoginPage } from "./GuestLogin";
import { ModeSelectPage } from "./ModeSelect";
import { RankingPage } from "./Ranking";
import "./App.css";
import Welcome from "./Welcome/Welcome";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/welcome"
					element={
						<Welcome
							onLoginSubmit={(name: string, password: string) => {
								console.log(name, password);
								throw new Error("Function not implemented.");
							}}
							onSignupSubmit={(name: string, password: string) => {
								console.log(name, password);
								throw new Error("Function not implemented.");
							}}
						/>
					}
				/>
				<Route path="/loading" element={<LoadingPage />} />
				<Route path="/guest-login" element={<GuestLoginPage />} />
				<Route path="/mode-select" element={<ModeSelectPage />} />
				<Route path="/ranking" element={<RankingPage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
