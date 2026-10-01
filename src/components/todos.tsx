import { createSignal, For, Show } from "solid-js";
import { addTodo, useTodos } from "~/lib/use-todos";
import { Todo } from "./todo-item";

export default function Todos() {
  const todos = useTodos();

  return (
    <div>
      <div class="flex flex-col gap-3">
        {todos.loading ? (
          <p>Loading todos...</p>
        ) : todos.error ? (
          <p role="alert" class="text-red-600">{todos.error}</p>
        ) : (
          <For each={todos.data} fallback={<p><b>Add your first todo item!</b></p>}>
            {(todo) => <Todo todo={todo} />}
          </For>
        )}
      </div>
      <TodoForm />
    </div>
  );
}

export function TodoForm() {
  const [text, setText] = createSignal("");
  const [error, setError] = createSignal<string | null>(null);

  const onSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    setError(null);

    const result = await addTodo(text());
    setError(result.error);

    if (!result.error) setText("");
  };

  return (
    <div class="mt-5">
      <form class="flex gap-3 items-center justify-center" onSubmit={onSubmit}>
        <input
          class="border p-2 rounded-lg"
          aria-label="New task"
          value={text()}
          onInput={(event) => setText(event.currentTarget.value)}
          required
        />
        <button class="border p-2 rounded-lg bg-purple-600 text-white font-semibold" type="submit">
          Add Task
        </button>
      </form>
      <Show when={error()}>
        <p role="alert" class="mt-2 text-center text-red-600">{error()}</p>
      </Show>
    </div>
  );
}
