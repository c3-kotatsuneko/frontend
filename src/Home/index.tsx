import { lazy, Suspense } from "react";
import ARApp from "../Test/Test";
import HandTrackingComponent from "../Test/Hand";
const Component = lazy(() => import("../SignupForm/Signup"));

function Home() {
  return (
    <div>
      <ARApp />
      <HandTrackingComponent />
      <h1>hello world!!!!!!!!!!!!!!!!!!!!!!!</h1>
      <p>this is a react</p>
      <Suspense>
        <Component onSubmit={() => {}} />
      </Suspense>
    </div>
  );
}

export default Home;
