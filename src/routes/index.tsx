import { Meta, Title } from "@solidjs/meta";
import Home from "~/components/home";
import { UserProvider } from "~/lib/use-user";

export default function Index() {
  return (
    <main>
      <UserProvider>
        <Title>SolidStart - Firebase</Title>
        <Meta name="description" content="Sign in with Google and manage your realtime Firebase todo list with SolidStart." />
        <Home />
      </UserProvider>
    </main>
  );
}
