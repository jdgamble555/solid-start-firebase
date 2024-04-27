import { Loading, Login } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Profile from "./profile";
import { Match, Switch } from "solid-js";

export default function Home() {

    const [user] = useUser({ data: null, loading: true });

    return (
        <div class="text-center">
            <h1 class="text-3xl font-semibold my-3">
                Solid Start Firebase Todo App
            </h1>
            <Switch fallback={<Login />}>
                <Match when={user.loading}>
                    <Loading />
                </Match>
                <Match when={user.data}>
                    <Profile />
                </Match>
            </Switch>
        </div>
    );
}
