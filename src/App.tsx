import { Navigate, Route, Routes } from "react-router-dom";

import { LoadingPage } from "./pages/Loading";
import { GuestLoginPage } from "./pages/GuestLogin";
import { ModeSelectPage } from "./pages/ModeSelect";
import { SharePage } from "./pages/Share";
import { RankingPage } from "./pages/Ranking";
import { RankingPreviewPage } from "./pages/RankingPreview";
import Welcome from "./pages/Welcome";
import { PlayTimeAttack } from "./pages/PlayTimeAttack";
import { PlayStart } from "./pages/PlayStart";
import { GoHome } from "./pages/GoHome";
import { Maintenance } from "./pages/503";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" />
        <Route index element={<Navigate to="/503" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/guest_login" element={<GuestLoginPage />} />
        <Route path="/mode_select" element={<ModeSelectPage />} />
        <Route path="/ranking_preview" element={<RankingPreviewPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/play_timeAttack" element={<PlayTimeAttack />} />
        <Route path="/congratulation_share_sns" element={<SharePage />} />
        <Route path="/503" element={<Maintenance />} />
        <Route path="/play_start" element={<PlayStart />} />
        <Route path="/go_home" element={<GoHome />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
