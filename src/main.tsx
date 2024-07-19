import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App";
import "./index.css";
import Layout from "./layout";
import { LoadingPage } from "./pages/Loading";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<BrowserRouter>
			<Suspense fallback={<LoadingPage />}>
				<Layout>
					<AppRoutes />
				</Layout>
			</Suspense>
		</BrowserRouter>
	</React.StrictMode>,
);
