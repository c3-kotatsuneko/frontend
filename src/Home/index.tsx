import { lazy, Suspense } from "react";
const Component = lazy(() => import("../Signup.tsx"));

function Home() {
  return (
    <div>
      <h1>hello world!!!!!!!!!!!!!!!!!!!!!!!</h1>
      <p>this is a react</p>
      <Suspense>
        <Component onSubmit={() => {}} />
      </Suspense>
    </div>
  );
}

export default Home;
