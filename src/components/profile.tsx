import { Logout } from "~/lib/helpers";
import { useUser } from "~/lib/use-user";
import Todos from "./todos";

export default function Profile() {

    const [user] = useUser();

    if (!user.data) {
        return;
    }

    const { displayName, photoURL, uid } = user.data;

    return (
        <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold">Hi {displayName}!</h3>
            {/*-- can't use show when here --> */}
            {photoURL &&
                <img src={photoURL} width="100" height="100" alt="user avatar" />
            }
            <p>Your userID is {uid}</p>
            <Logout />
            <Todos />
        </div>
    );
}