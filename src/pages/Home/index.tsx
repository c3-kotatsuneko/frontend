import { lazy, Suspense } from "react";
import ExitButton from "../../components/features/play/ExitButton";
import { Timer } from "../../components/features/play/Timer";
const Component = lazy(
	() => import("../../components/features/welcome/SignupForm"),
);

function Home() {
	return (
		<div>
			<Timer remainingTime={250} />
			<h1>hello world!!!!!!!!!!!!!!!!!!!!!!!</h1>
			<p>this is a react</p>
			<Suspense>
				<Component onSubmit={() => {}} />
			</Suspense>
			<ExitButton />
		</div>
	);
}

export default Home;
