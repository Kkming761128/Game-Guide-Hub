import { findAndReplace } from "mdast-util-find-and-replace";

/** Renders ==text== as <mark class="hl">text</mark>, mirroring emphasis the original source guides called out. */
export default function remarkHighlight() {
  return (tree) => {
    findAndReplace(tree, [
      [
        /==([^=]+)==/g,
        (_match, text) => ({ type: "html", value: `<mark class="hl">${text}</mark>` }),
      ],
    ]);
  };
}
