export function handleCopy(wrapper) {
  wrapper.addEventListener("click", async (e) => {
    if (!e.target.classList.contains("copy_url_btn")) return;

    const btn = e.target;
    const url = btn.dataset.url;

    try {
      await navigator.clipboard.writeText(url);
      btn.textContent = "Copied!";

      setTimeout(() => {
        btn.textContent = "Copy";
      }, 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  });
}
