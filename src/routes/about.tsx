import { Title } from "@solidjs/meta";
import { RouteDefinition, query, createAsync } from "@solidjs/router";
import { Show } from "solid-js";

const getAboutPage = query(async () => {
  'use server';
  const { getAbout } = await import("~/lib/about");
  return await getAbout();
}, 'about');

export const route = {
  preload: () => getAboutPage(),
} satisfies RouteDefinition;

export default function About() {

  const about = createAsync(() => getAboutPage(), { deferStream: true });

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
