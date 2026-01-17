import { shortenUrl } from "./api.js";
import { clearAllUrls, getStoredUrls, saveUrl } from "./storage.js";
import { clearUrlsUI, renderUrl, showToast, toggleClearAllBtn } from "./ui.js";
import { handleUrlActions } from "./actions.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("url_shortener_form");
  const urlShortenerBtn = document.getElementById("url_shortener_btn");
  const input = document.getElementById("url_shortener_input");
  const urlsWrapper = document.querySelector(".urls_wrapper");
  const clearAllBtn = document.getElementById("clear_all_btn");
  const inputErrorMessage = document.querySelector(".input_error_message");

  /* Load URLs from localStorage on page load */
  const storedUrls = getStoredUrls();

  storedUrls.forEach((url) => renderUrl(url, urlsWrapper));

  toggleClearAllBtn(clearAllBtn, storedUrls.length > 0);

  /* Enable copy + delete */
  handleUrlActions(urlsWrapper);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      input.classList.add("input_error");
      inputErrorMessage.classList.add("show_input_error_message");
      return;
    }

    input.classList.remove("input_error");

    inputErrorMessage.classList.remove("show_input_error_message");

    // 🔄 Loading state
    urlShortenerBtn.textContent = "Shortening...";
    urlShortenerBtn.classList.add("loading");

    // No internet
    if (!navigator.onLine) {
      urlShortenerBtn.textContent = "Shorten";
      urlShortenerBtn.classList.remove("loading");
      showToast("🚫 No internet connection! Check your network.", "error");
      return;
    }

    try {
      const shortenedUrl = await shortenUrl(input.value);

      /* Save to localStorage */
      const savedUrl = saveUrl(input.value, shortenedUrl);

      /* Render to UI */
      renderUrl(savedUrl, urlsWrapper);

      showToast("Url shortened successfully!");

      urlShortenerBtn.textContent = "Shorten";
      urlShortenerBtn.classList.remove("loading");

      /* Show Clear All immediately */
      toggleClearAllBtn(clearAllBtn, true);

      input.value = "";
    } catch (err) {
      showToast("Failed to shorten URL. Try again.");
      console.error(err);
    } finally {
      shortenBtn.textContent = "Shorten";
      shortenBtn.classList.remove("loading");
    }
  });

  /* Clear All */
  clearAllBtn.addEventListener("click", () => {
    clearAllUrls();
    clearUrlsUI(urlsWrapper);

    /* Hide Clear All */
    toggleClearAllBtn(clearAllBtn, false);

    showToast("You've cleared your storage successfully!");

    window.location.reload()
  });
});
