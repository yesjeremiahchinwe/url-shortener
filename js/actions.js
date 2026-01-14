import { deleteUrl } from "./storage.js";

export function handleUrlActions(wrapper) {
  wrapper.addEventListener("click", async (e) => {
    const target = e.target;

    /* COPY */
    if (target.classList.contains("copy_url_btn")) {
      const url = target.dataset.url;

      try {
        await navigator.clipboard.writeText(url);
        target.textContent = "Copied!";

        setTimeout(() => {
          target.textContent = "Copy";
        }, 1500);
      } catch (err) {
        console.error("Copy failed:", err);
      }
    }

    /* DELETE */
    if (target.classList.contains("delete_url_btn")) {
      const shortenedUrl = target.dataset.url;

      deleteUrl(shortenedUrl);

      target.closest(".url").remove();
    }
  });
}
