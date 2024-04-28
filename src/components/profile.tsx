import { Logout } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Todos from "./todos";
import { Show } from "solid-js";

export default function Profile() {

    const [user] = useUser();

    if (!user.data) {
        return;
    }

    const { displayName, photoURL, uid } = user.data;

    return (
        <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold">Hi {displayName}!</h3>
            <Show when={photoURL}>
                {(data) => (
                    <img src={data()} width="100" height="100" alt="user avatar" />
                )}
            </Show>
            <p>Your userID is {uid}</p>
            <Logout />
            <Todos />
        </div>
    );
}