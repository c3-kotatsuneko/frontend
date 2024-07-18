/* eslint-disable no-mixed-spaces-and-tabs */
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
	const handleGuestLoginSubmit = async (name: string) => {
		try {
		  const response = await fetch('hogehogedayo', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name }),
		  });
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
		  const data = await response.json();
		  console.log('Server response:', data);
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
				<Route path="/guest_login" element={<GuestLoginPage onSubmit={handleGuestLoginSubmit} />} />
				<Route path="/mode_select" element={<ModeSelectPage />} />
				<Route path="/congratulation_share_sns" element={<SharePage />} />
				<Route path="/ranking" element={<RankingPage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
