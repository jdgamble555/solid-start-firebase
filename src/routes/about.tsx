import { Title } from "@solidjs/meta";
import { RouteDefinition, cache, createAsync } from "@solidjs/router";
import { Show } from "solid-js";
import { getAbout } from "~/lib/about";

const getAboutPage = cache(async () => {
  'use server';
  return await getAbout();
}, 'about');

export const route = {
  load: () => getAboutPage(),
} satisfies RouteDefinition;

export default function About() {

  const about = createAsync(() => getAboutPage());

  return (
    <Show when={about()}>
      {(data) => (
        <>
          <Title>About</Title>
          <div class="flex items-center justify-center my-5">
            <div class="border w-[400px] p-5 flex flex-col gap-3">
              <h1 class="text-3xl font-semibold">{data().name}</h1>
              <p>{data().description}</p>
            </div>
          </div>
        </>
      )}
    </Show>
  );
};