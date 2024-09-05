import { Navigate, Route, Routes } from "react-router-dom";

import { LoadingPage } from "./pages/Loading";
import { GuestLoginPage } from "./pages/GuestLogin";
import { ModeSelectPage } from "./pages/ModeSelect";
import { SharePage } from "./pages/Share";
import { TimeAttackRankingPage } from "./pages/TimeAttackRanking";
import { TimeAttackRankingPreviewPage } from "./pages/TimeAttackRankingPreview";
import Welcome from "./pages/Welcome";
import { PlayTimeAttack } from "./pages/PlayTimeAttack";
import { PlayStart } from "./pages/PlayStart";
import { Maintenance } from "./pages/503";
import { MultiRankingPage } from "./pages/MultiRanking";
import { ARfunction } from "./pages/AR";

const AppRoutes = () => {
	return (
		<>
			<Routes>
				<Route path="/" />
				<Route index element={<Navigate to="/503" replace />} />
				<Route path="/503" element={<Maintenance />} />
				<Route path="/loading" element={<LoadingPage />} />
				<Route path="/welcome" element={<Welcome />} />
				<Route path="/guest_login" element={<GuestLoginPage />} />
				<Route path="/mode_select" element={<ModeSelectPage />} />
				<Route
					path="/ranking_TimeAttack_preview"
					element={<TimeAttackRankingPreviewPage />}
				/>
				<Route path="/play_timeAttack" element={<PlayTimeAttack />} />
				<Route path="/play_multi" element={<PlayTimeAttack />} />
				<Route path="/play_training" element={<PlayTimeAttack />} />
				<Route path="/ranking_timeAttack" element={<TimeAttackRankingPage />} />
				<Route path="/congratulation_share_sns" element={<SharePage />} />
				<Route path="/play_start" element={<PlayStart />} />
				<Route path="/ranking_multiplay" element={<MultiRankingPage />} />
				<Route path="/ARpage" element={<ARfunction />} />
			</Routes>
		</>
	);
};

export default AppRoutes;
