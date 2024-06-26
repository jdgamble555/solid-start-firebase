import { addTodo, useTodos } from "~/lib/use-todos";
import { useUser, userData } from "~/lib/use-user";
import { Todo } from "./todo-item";
import { For, Show } from "solid-js";

export default function Todos() {

    const _user = useUser();

    const todoStore = useTodos();

    const user = _user[0];

    return (
        <Show when={user.data}>
            {(user) => (
                <>
                    <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 justify-items-start">
                        <For each={todoStore.todos} fallback={<p><b>Add your first todo item!</b></p>}>
                            {(todo, _index) => (
                                <Todo {...{ todo }} />
                            )}
                        </For>
                    </div>
                    <TodoForm {...user()} />
                </>
            )}
        </Show>
    );
}

export const TodoForm = (user: userData) => {
    return (
        <form class="flex gap-3 items-center justify-center mt-5" onSubmit={(e) => addTodo(e, user.uid)}>
            <input class="border p-2" name="task" />
            <button class="border p-2 rounded-md text-white bg-sky-700" type="submit">
                Add Task
            </button>
        </form>
    );
};