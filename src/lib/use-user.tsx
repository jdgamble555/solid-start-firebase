import { createContext, createEffect, onCleanup, useContext, type ParentComponent } from "solid-js";
import { createStore } from "solid-js/store";
import { FirebaseError } from "firebase/app";
import { GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "./firebase";

export type UserType = {
  displayName: string | null;
  photoURL: string | null;
  uid: string;
  email: string | null;
};

type UserState = {
  loading: boolean;
  data: UserType | null;
};

const UserContext = createContext<UserState>();

export const setUser = () => {
  const [user, updateUser] = createStore<UserState>({
    loading: true,
    data: null,
  });

  createEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (user) => {
      if (!user) {
        updateUser({ loading: false, data: null });
        return;
      }

      const { displayName, photoURL, uid, email } = user;
      updateUser({
        loading: false,
        data: { displayName, photoURL, uid, email },
      });
    });

    onCleanup(unsubscribe);
  });

  return user;
};

export const UserProvider: ParentComponent = (props) => {
  const user = setUser();

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
};

export const getUser = () => {
  const user = useContext(UserContext);
  if (!user) throw new Error("getUser requires a UserProvider.");
  return user;
};

export const loginWithGoogle = async () => {
  try {
    await signInWithPopup(auth, new GoogleAuthProvider());
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error) {
    if (error instanceof FirebaseError) {
      return { error: error.message };
    }
    throw error;
  }
};
