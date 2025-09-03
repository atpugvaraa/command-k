init();

function init() {
  replaceSearchBarWithShortcut();
  removeShorts();
  removeCreateButton();
  const overlay = createOverlay();

  const input = overlay.querySelector("input#search"); // YouTube’s own search input
  handleShortcut(overlay, input);
}

// --- Setup ---
function replaceSearchBarWithShortcut() {
  const searchBar = document.getElementById("center");
  if (searchBar) {
    searchBar.innerHTML = `
      <span class="DocSearch-Button-Keys">
        <kbd class="DocSearch-Button-Key">⌘</kbd>
        <kbd class="DocSearch-Button-Key">K</kbd>
      </span>
    `;
  }
}

function createOverlay() {
  const overlay = document.createElement("div");
  overlay.id = "cmdk-overlay";
  overlay.innerHTML = `
    <yt-searchbox role="search" class="ytSearchboxComponentHost ytSearchboxComponentDesktop ytd-masthead"></yt-searchbox>
  `;
  overlay.style.display = "none";
  document.body.appendChild(overlay);
  return overlay;
}

function handleShortcut(overlay, input) {
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (overlay.style.display === "flex") {
        // hide if already open
        overlay.style.display = "none";
      } else {
        // show if hidden
        overlay.style.display = "flex";
        if (input) input.focus();
      }
    }

    if (e.key === "Escape") {
      overlay.style.display = "none";
    }
  });
}

function removeCreateButton() {
  const createButtons = document.querySelectorAll("#buttons ytd-button-renderer");
  createButtons.forEach((btn) => {
    const text = btn.innerText?.trim();
    if (text === "Create") btn.remove();
  });
}

function removeShorts() {
  document.querySelectorAll('ytd-mini-guide-entry-renderer[aria-label="Shorts"], ytd-rich-section-renderer, ytd-reel-shelf-renderer, [title="Shorts"]').forEach(el => el.remove());
}