import { Link, MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";


export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Title>SolidStart - Firebase</Title>
          <nav class="flex gap-3 justify-center mt-5">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
          </nav>
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
