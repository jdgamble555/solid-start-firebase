import { Logout } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Todos from "./todos";
import { Show } from "solid-js";

export default function Profile() {

    const [user] = useUser();

    return (
        <Show when={user.data}>
            {(user) => (
                <div class="flex flex-col gap-3 items-center">
                    <h3 class="font-bold">Hi {user().displayName}!</h3>
                    <Show when={user().photoURL}>
                        {(data) => (
                            <img src={data()} width="100" height="100" alt="user avatar" />
                        )}
                    </Show>
                    <p>Your userID is {user().uid}</p>
                    <Logout />
                    <Todos />
                </div>
            )}
        </Show>
    );
}