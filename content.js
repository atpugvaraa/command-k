init()

function init() {
  const overlay = createOverlay()
  replaceSearchBarWithShortcut()
  handleShortcut(overlay)
}

function replaceSearchBarWithShortcut() {
  let searchBar = document.getElementById("center")
  
  if (searchBar) {
    searchBar.innerHTML = `
    <span class="DocSearch-Button-Keys">
    <kbd class="DocSearch-Button-Key">⌘</kbd>
    <kbd class="DocSearch-Button-Key">K</kbd>
    </span>
    `
  }
}

function createOverlay() {
  const overlay = document.createElement("div")
  overlay.id = "cmdk-overlay"
  overlay.innerHTML = `<yt-searchbox role="search" class="ytSearchboxComponentHost ytSearchboxComponentDesktop ytd-masthead"></yt-searchbox>`
  overlay.style.display = "none"
  document.body.appendChild(overlay)
  return overlay
}

function handleShortcut(overlay) {
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault()

      if (overlay.style.display === "flex") {
        // hide if already open
        overlay.style.display = "none"
      } else {
        // show if hidden
        overlay.style.display = "flex"
        const input = overlay.querySelector("input.ytSearchboxComponentInput") // Correctly select the input element
        if (input) input.focus()
      }
    }

    if (e.key === "Escape") {
      overlay.style.display = "none"
    }
  })
}