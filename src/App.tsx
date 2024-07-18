import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import { LoadingPage } from "./Loading";
import { GuestLoginPage } from "./GuestLogin";
import { ModeSelectPage } from "./ModeSelect";
import { SharePage } from "./Share";
import { RankingPage } from "./Ranking";
import "./App.css";
import Welcome from "./Welcome/Welcome";

const AppRoutes = () => {
	const handleLoginSubmit = async (name: string, password: string) => {
		try {
			const response = await fetch('fugafugadayo', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, password }),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			console.log('Login response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const handleSignupSubmit = async (name: string, password: string) => {
		try {
			const response = await fetch('hemuhemudane', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name, password }),
			});
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();
			console.log('Signup response:', data);
		} catch (error) {
			console.error('Error:', error);
		}
	};
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/welcome"
					element={
						<Welcome
							onLoginSubmit={handleLoginSubmit}
							onSignupSubmit={handleSignupSubmit}
						/>
					}
				/>
				<Route path="/loading" element={<LoadingPage />} />
				<Route path="/guest_login" element={<GuestLoginPage />} />
				<Route path="/mode_select" element={<ModeSelectPage />} />
				<Route path="/congratulation_share_sns" element={<SharePage />} />
				<Route path="/ranking" element={<RankingPage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
