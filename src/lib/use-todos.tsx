import { createEffect, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";
import {
  collection,
  deleteDoc,
  doc,
  FirestoreError,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  type FirestoreDataConverter,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { getUser } from "./use-user";

export type TodoDoc = {
  id: string;
  uid: string;
  text: string;
  complete: boolean;
  createdAt: Date;
};

const todoConverter: FirestoreDataConverter<TodoDoc> = {
  toFirestore(todo) {
    return todo;
  },

  fromFirestore(snapshot) {
    const data = snapshot.data({ serverTimestamps: "estimate" });
    const createdAt = data.createdAt as Timestamp;

    return {
      id: snapshot.id,
      uid: data.uid,
      text: data.text,
      complete: data.complete,
      createdAt: createdAt.toDate(),
    };
  },
};

export const useTodos = () => {
  const user = getUser();
  const [todos, setTodos] = createStore<{
    data: TodoDoc[];
    loading: boolean;
    error: string | null;
  }>({
    data: [],
    loading: true,
    error: null,
  });

  createEffect(() => {
    const currentUser = user.data;

    if (!currentUser) {
      setTodos({ data: [], loading: false, error: null });
      return;
    }

    setTodos({ data: [], loading: true, error: null });

    const unsubscribe = onSnapshot(
      query(
        collection(db, "todos"),
        where("uid", "==", currentUser.uid),
        orderBy("createdAt"),
      ).withConverter(todoConverter),
      (snapshot) => {
        const data = snapshot.docs.map((item) => item.data());
        setTodos({ data, loading: false, error: null });
      },
      (error) => {
        setTodos({ data: [], loading: false, error: error.message });
      },
    );

    onCleanup(unsubscribe);
  });

  return todos;
};

export const addTodo = async (text: string) => {
  const user = auth.currentUser;

  if (!user) return { error: "No user" };
  if (!text.trim()) return { error: "Enter a task." };

  try {
    await setDoc(doc(collection(db, "todos")), {
      uid: user.uid,
      text: text.trim(),
      complete: false,
      createdAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const updateTodo = async (id: string, complete: boolean) => {
  try {
    await updateDoc(doc(db, "todos", id), {
      complete,
      updatedAt: serverTimestamp(),
    });
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};

export const deleteTodo = async (id: string) => {
  try {
    await deleteDoc(doc(db, "todos", id));
    return { error: null };
  } catch (error) {
    if (error instanceof FirestoreError) {
      return { error: error.message };
    }
    throw error;
  }
};
