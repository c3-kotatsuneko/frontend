import { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./App";
import "./index.css";
import Layout from "./layout";
import { LoadingPage } from "./pages/Loading";

const root = document.getElementById("root");
if (root) {
	ReactDOM.createRoot(root).render(
		<BrowserRouter>
			<Suspense fallback={<LoadingPage />}>
				<Layout>
					<AppRoutes />
				</Layout>
			</Suspense>
		</BrowserRouter>,
	);
}
