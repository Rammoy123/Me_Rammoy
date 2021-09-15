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
