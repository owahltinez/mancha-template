import { describe, it } from "node:test";
import * as fs from "node:fs/promises";
import { Renderer } from "mancha";
import { main } from "./index.main.js";

describe("Main", () => {
  it("should render the home tab by default", async (ctx) => {
    const content = await fs.readFile("src/index.html", "utf-8");
    const renderer = new Renderer();
    const doc = renderer.parseHTML(content, { rootDocument: true });
    const fragment = doc.querySelector("body");
    await main(renderer, fragment);
    await renderer.mount(fragment, { dirpath: "src" });

    const homeTab = fragment.querySelector("[data-tab='home']");
    const aboutTab = fragment.querySelector("[data-tab='about']");

    // The active tab is the one without display: none
    ctx.assert.equal(renderer.get("$$tab"), "home");
    ctx.assert.equal(homeTab.style.display, "");
    ctx.assert.equal(aboutTab.style.display, "none");
  });

  it("should switch to the about tab when clicked", async (ctx) => {
    const content = await fs.readFile("src/index.html", "utf-8");
    const renderer = new Renderer();
    const doc = renderer.parseHTML(content, { rootDocument: true });
    const fragment = doc.querySelector("body");
    await main(renderer, fragment);
    await renderer.mount(fragment, { dirpath: "src" });

    const aboutLink = fragment.querySelector("[data-nav='about']");
    aboutLink.click();

    ctx.assert.equal(renderer.get("$$tab"), "about");
    ctx.assert.equal(aboutLink.style.display, "");
  });
});
