import { useShared } from "./use-shared";
import {
    User,
    onIdTokenChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider
} from "firebase/auth";
import { auth } from "./firebase";
import { createStore } from "solid-js/store";
import { onCleanup } from "solid-js";

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

type UserState = {
    loading: boolean;
    data: userData | null;
};

export function _useUser(initialValue: UserState = {
    loading: true,
    data: null
}) {

    const _store = createStore<UserState>(initialValue);

    const setUser = _store[1];

    setUser(v => ({ ...v, loading: true }));

    // subscribe to user changes
    const unsubscribe = onIdTokenChanged(auth, (_user: User | null) => {

        if (!_user) {
            setUser({ data: null, loading: false });
            return;
        }

        // map data to user data type
        const { photoURL, uid, displayName, email } = _user;
        const data = { photoURL, uid, displayName, email };

        // print data in dev mode
        if (process.env.NODE_ENV === 'development') {
            console.log(data);
        }

        // set store
        setUser({ loading: false, data });
    });

    onCleanup(unsubscribe);

    return _store;
}

export const useUser = (initialValue?: UserState) =>
    useShared('user', _useUser, initialValue);

export const loginWithGoogle = () =>
    signInWithPopup(auth, new GoogleAuthProvider());

export const logout = () => signOut(auth);