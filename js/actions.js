import { deleteUrl, getStoredUrls } from "./storage.js";
import { showToast, toggleClearAllBtn } from "./ui.js";

export function handleUrlActions(wrapper, clearAllBtn) {
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
        showToast("Copy failed!", "error");
      }
    }

    /* DELETE */
    if (target.classList.contains("delete_url_btn")) {
      const shortenedUrl = target.dataset.url;

      deleteUrl(shortenedUrl);
      showToast("Url deleted successfully!")
      target.closest(".url").remove();

      const remainingUrls = getStoredUrls();
      toggleClearAllBtn(clearAllBtn, remainingUrls.length > 1);
    }
  });
}
