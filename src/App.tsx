import { Navigate, Route, Routes } from "react-router-dom";

import { LoadingPage } from "./pages/Loading";
import { GuestLoginPage } from "./pages/GuestLogin";
import { ModeSelectPage } from "./pages/ModeSelect";
import { SharePage } from "./pages/Share";
import { RankingPage } from "./pages/Ranking";
import { RankingPreviewPage } from "./pages/RankingPreview";
import Welcome from "./pages/Welcome";

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

	return (
		<>
			<Routes>
				<Route path="/" />
				<Route index element={<Navigate to="/welcome" replace />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/loading" element={<LoadingPage />} />
				<Route
					path="/guest_login"
					element={<GuestLoginPage onSubmit={handleGuestLoginSubmit} />}
				/>
				<Route path="/mode_select" element={<ModeSelectPage />} />
				<Route path="/ranking_preview" element={<RankingPreviewPage />} />
				<Route path="/ranking" element={<RankingPage />} />
				<Route path="/congratulation_share_sns" element={<SharePage />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
