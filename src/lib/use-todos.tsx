import {
    type DocumentData,
    onSnapshot,
    type QuerySnapshot,
    Timestamp
} from 'firebase/firestore';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';

import { db } from './firebase';
import { useUser } from './use-user';
import { createStore } from 'solid-js/store';
import { onCleanup } from 'solid-js';

export interface TodoItem {
    id: string;
    text: string;
    complete: boolean;
    created: Date;
    uid: string;
};

export const snapToData = (
    q: QuerySnapshot<DocumentData, DocumentData>
) => {

    // creates todo data from snapshot
    if (q.empty) {
        return [];
    }
    return q.docs.map((doc) => {
        const data = doc.data({
            serverTimestamps: 'estimate'
        });
        const created = data.created as Timestamp;
        return {
            ...data,
            created: created.toDate(),
            id: doc.id
        }
    }) as TodoItem[];
}


export function useTodos() {

    const _user = useUser();

    const _store = createStore<{
        todos: TodoItem[],
        loading: boolean
    }>({
        todos: [],
        loading: true
    });

    const user = _user[0];

    const setTodos = _store[1];

    setTodos(v => ({ ...v, loading: true }));

    if (!user.data) {
        setTodos({ loading: false, todos: [] });
        return _store[0];
    }

    const unusbscribe = onSnapshot(

        // query realtime todo list
        query(
            collection(db, 'todos'),
            where('uid', '==', user.data.uid),
            orderBy('created')
        ), (q) => {

            // get data, map to todo type
            const data = snapToData(q);

            /**
             * Note: Will get triggered 2x on add 
             * 1 - for optimistic update
             * 2 - update real date from server date
             */

            // print data in dev mode
            if (process.env.NODE_ENV === 'development') {
                console.log(data);
            }

            // add to store
            setTodos({ loading: false, todos: data });

        });

    onCleanup(unusbscribe);

    return _store[0];
};

export const addTodo = (
    e: SubmitEvent,
    uid: string
) => {

    e.preventDefault();

    // get and reset form
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form);

    if (typeof task !== 'string') {
        return;
    }

    // reset form
    target.reset();

    addDoc(collection(db, 'todos'), {
        uid,
        text: task,
        complete: false,
        created: serverTimestamp()
    });
}

export const updateTodo = (id: string, complete: boolean) => {
    updateDoc(doc(db, 'todos', id), { complete });
}

export const deleteTodo = (id: string) => {
    deleteDoc(doc(db, 'todos', id));
}