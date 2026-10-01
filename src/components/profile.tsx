import { Show } from "solid-js";
import { Logout } from "~/lib/helpers";
import { getUser } from "~/lib/use-user";
import Todos from "./todos";

export default function Profile() {
  const user = getUser();

  return (
    <Show when={user.data}>
      {(user) => (
        <div class="flex flex-col gap-3 items-center">
          <h3 class="font-bold">Hi {user().displayName}!</h3>
          <img src={user().photoURL || ""} width="100" height="100" alt="user avatar" />
          <p>Your userID is {user().uid}</p>
          <Logout />
          <Todos />
        </div>
      )}
    </Show>
  );
}
