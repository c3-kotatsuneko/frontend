import { lazy, Suspense } from "react";
import ExitButton from "../ExitButton";
import { Timer } from "../components/Timer";
const Component = lazy(() => import("../SignupForm/Signup"));

function Home() {
	return (
		<div>
			<Timer remainingTime={250} />
			<h1>hello world!!!!!!!!!!!!!!!!!!!!!!!</h1>
			<p>this is a react</p>
			<Suspense>
				<Component onSubmit={() => {}} />
			</Suspense>
			<ExitButton/>
		</div>
	);
}

export default Home;
