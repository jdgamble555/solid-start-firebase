import { Title } from "@solidjs/meta";
import Home from "~/components/home";
import { Provider } from "~/lib/use-shared";

export default function Index() {
  return (
    <main>
      <Provider>
        <Title>SolidStart - Firebase</Title>
        <Home />
      </Provider>
    </main>
  );
}
