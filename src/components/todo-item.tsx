import { Show } from "solid-js";
import { TodoItem, deleteTodo, updateTodo } from "~/lib/use-todos";

// each todo item
export const Todo = ({ todo }: { todo: TodoItem, key: string }) => {
    return (
        <>
            <span class={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.text}
            </span>
            <span class={todo.complete ? 'line-through text-green-700' : ''}>
                {todo.id}
            </span>
            <Show when={todo.complete}>
                <button type="button" onClick={() => updateTodo(todo.id, !todo.complete)}>
                    ✔️
                </button>
            </Show>
            <Show when={!todo.complete}>
                <button type="button" onClick={() => updateTodo(todo.id, !todo.complete)}>
                    ❌
                </button>
            </Show>
            <button type="button" onClick={() => deleteTodo(todo.id)}>🗑</button>
        </>
    );
};