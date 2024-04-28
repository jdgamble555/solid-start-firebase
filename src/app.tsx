import { MetaProvider } from "@solidjs/meta";
import { Router, A } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";


export default function App() {
  return (
    <Router
      root={props => (
        <MetaProvider>
          <Suspense>{props.children}</Suspense>
          <nav class="flex gap-3 justify-center mt-5">
            <A href="/">Home</A>
            <A href="/about">About</A>
          </nav>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
