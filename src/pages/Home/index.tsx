import { lazy, Suspense } from "react";
import ExitButton from "../../components/features/ExitButton";
import { Timer } from "../../components/features/Timer";
const Component = lazy(
	() => import("../../components/features/SignupForm/Signup"),
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
