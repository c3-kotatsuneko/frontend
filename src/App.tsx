import { Route, Routes } from "react-router-dom";
import Home from "./Home";
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
			</Routes>
		</>
	);
};

export default AppRoutes;
