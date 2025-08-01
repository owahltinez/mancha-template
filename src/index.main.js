/**
 * @param {import("mancha").Renderer} renderer
 * @param {HTMLElement} body
 */
export async function main(renderer, body) {
  const { $ } = renderer;

  // Define the initial state.
  await $.set('$$tab', 'home');
  await $.set('counter', 0);

  // Define functions used in the subcomponents.
  $.incrementCounter = function () {
    const counter = this.get("counter");
    this.set("counter", counter + 1);
  };
}
