import type React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{children}
			<footer>
				<p>Created by こたつねこ</p>
			</footer>
		</>
	);
};

export default Layout;
