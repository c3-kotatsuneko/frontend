import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import { LoadingPage } from "./pages/Loading";
import { GuestLoginPage } from "./pages/GuestLogin";
import { ModeSelectPage } from "./pages/ModeSelect";
import { SharePage } from "./pages/Share";
import { RankingPage } from "./pages/Ranking";
import Welcome from "./pages/Welcome/Welcome";

const AppRoutes = () => {
	const handleGuestLoginSubmit = async (name: string) => {
		try {
			const response = await fetch("hogehogedayo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("Server response:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const [loginError, setLoginError] = useState<string | null>(null);

	const handleLoginSubmit = async (name: string, password: string) => {
		try {
			const response = await fetch("fugafugadayo", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, password }),
			});
			if (!response.ok) {
				setLoginError("あれ、なにかちがうみたいだよ");
				return;
			}
			const data = await response.json();
			if (data.success) {
				setLoginError(null);
				console.log("Login response:", data);
			} else {
				setLoginError("あれ、なにかちがうみたいだよ");
			}
		} catch (error) {
			console.error("Error:", error);
			setLoginError("あれ、なにかちがうみたいだよ");
		}
	};

	const handleSignupSubmit = async (name: string, password: string) => {
		try {
			const response = await fetch("hemuhemudane", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, password }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("Signup response:", data);
		} catch (error) {
			console.error("Error:", error);
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
							loginError={loginError}
						/>
					}
				/>
				<Route path="/loading" element={<LoadingPage />} />
				<Route
					path="/guest_login"
					element={<GuestLoginPage onSubmit={handleGuestLoginSubmit} />}
				/>
				<Route path="/mode_select" element={<ModeSelectPage />} />
				<Route path="/congratulation_share_sns" element={<SharePage />} />
				<Route path="/ranking" element={<RankingPage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
