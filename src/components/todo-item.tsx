import { createSignal, Show } from "solid-js";
import { deleteTodo, updateTodo, type TodoDoc } from "~/lib/use-todos";

export function Todo(props: { todo: TodoDoc }) {
  const [error, setError] = createSignal<string | null>(null);

  return (
    <div class="grid grid-cols-[auto,auto,auto,auto] gap-3 items-center justify-items-start">
      <span class={props.todo.complete ? "line-through text-green-700" : ""}>
        {props.todo.text}
      </span>
      <span class={props.todo.complete ? "line-through text-green-700" : ""}>
        {props.todo.id}
      </span>
      <button type="button" aria-label="Toggle task completion" onClick={async () => {
        const result = await updateTodo(props.todo.id, !props.todo.complete);
        setError(result.error);
      }}>
        {props.todo.complete ? "✔️" : "❌"}
      </button>
      <button type="button" aria-label="Delete task" onClick={async () => {
        const result = await deleteTodo(props.todo.id);
        setError(result.error);
      }}>
        🗑
      </button>
      <Show when={error()}>
        <p role="alert" class="col-span-4 text-red-600">{error()}</p>
      </Show>
    </div>
  );
}
