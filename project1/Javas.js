
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="mystyle.css" />
  </head>
  <body>
    <div class="editor" contenteditable="true" spellcheck="false"></div>

    <div class="toolbar">
      <button type="button" data-action="bold">
        <svg
          class="action-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path fill="none" d="M0 0h24v24H0V0z" />
          <path
            d="M15.6 10.79c.97-.67 1.65-1.77 1.65-2.79 0-2.26-1.75-4-4-4H8c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h5.78c2.07 0 3.96-1.69 3.97-3.77.01-1.53-.85-2.84-2.15-3.44zM10 6.5h3c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-3v-3zm3.5 9H10v-3h3.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5z"
          />
        </svg>
      </button>
    </div>
  </body>
  <script src="Javas.js"></script>
</html>`





const TYPE_RANGE = "Range";
const ACTIVE_CLASS = "is-active";

const $toolbar = document.querySelector(".toolbar");
const $editor = document.querySelector(".editor");
const $actionButtons = $toolbar.querySelectorAll("button");
const exec = (cmd, param = null) => {
  document.execCommand("styleWithCSS", false);
  document.execCommand(cmd, false, param);
};

const getSelectionCoordinates = (selection) => {
  const r = selection.getRangeAt(0);
  const clip = r.getClientRects();

  if (!clip.length) return false;

  const { x, y, width } = clip[0];
  return { x, y, width };
};

const moveToolbar = (e) => {
  const selection = document.getSelection();
  const coordinates = getSelectionCoordinates(selection);

  if (coordinates && selection.type === TYPE_RANGE) {
    const toolbarX = coordinates.width / 2 + coordinates.x;
    updateActionStatus(selection);

    $toolbar.style.setProperty("--top", `${coordinates.y}px`);
    $toolbar.style.setProperty("--left", `${toolbarX}px`);
    $toolbar.style.display = "block";
  } else {
    $toolbar.style.display = "none";
  }
};

const getCssText = (selection) => {
  const parentEl = selection.anchorNode.parentElement;
  const extentEl = selection.focusNode.parentElement;
  return parentEl.style.cssText + extentEl.style.cssText;
};

const toggleActionState = (action, isActive) => {
  const actionBtn = document.querySelector(
    `.toolbar button[data-action="${action}"]`
  );
  actionBtn.classList.remove(ACTIVE_CLASS);
  if (isActive) {
    actionBtn.classList.add(ACTIVE_CLASS);
  }
};

const updateActionStatus = (selection) => {
  const actions = ["bold"];
  const cssText = getCssText(selection);

  actions.forEach((action) => {
    const isActive = cssText.includes(action);
    toggleActionState(action, isActive);
  });
};

const handleActionClick = (btn) => {
  const isActive = !btn.classList.contains(ACTIVE_CLASS);
  const { action } = btn.dataset;

  toggleActionState(action, isActive);
  exec(action);
};

function initialize() {
  document.addEventListener("selectionchange", moveToolbar);

  $editor.addEventListener("mouseup", moveToolbar);

  $actionButtons.forEach((action) => {
    action.addEventListener("click", () => handleActionClick(action));
  });
}

initialize();
