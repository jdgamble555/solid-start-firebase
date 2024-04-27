import Home from "~/components/home";
import { Provider } from "~/lib/use-shared";

export default function Index() {
  return (
    <main>
        <Provider>
            <Home />
        </Provider>
    </main>
  );
}
