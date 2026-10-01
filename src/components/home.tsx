import { Loading, Login } from "~/lib/helpers";
import { getUser } from "~/lib/use-user";
import Profile from "./profile";

export default function Home() {
  const user = getUser();

  return (
    <div class="text-center">
      <h1 class="text-3xl font-semibold my-3">SolidStart Firebase Todo App</h1>
      {user.loading ? <Loading /> : user.data ? <Profile /> : <Login />}
    </div>
  );
}
