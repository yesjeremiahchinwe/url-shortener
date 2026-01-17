import { shortenUrl } from "./api.js";
import { clearAllUrls, getStoredUrls, saveUrl } from "./storage.js";
import { clearUrlsUI, renderUrl, showToast, toggleClearAllBtn } from "./ui.js";
import { handleUrlActions } from "./actions.js";

let isOnline = navigator.onLine;

window.addEventListener("offline", () => {
  isOnline = false;

  showToast("🚫 No internet connection! Check your network.", "error");
});

window.addEventListener("online", () => {
  isOnline = true;
});

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

  toggleClearAllBtn(clearAllBtn, storedUrls.length > 1);

  /* Enable copy + delete */
  handleUrlActions(urlsWrapper, clearAllBtn);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!input.value.trim()) {
      input.classList.add("input_error");
      inputErrorMessage.classList.add("show_input_error_message");
      return;
    }

    input.classList.remove("input_error");

    inputErrorMessage.classList.remove("show_input_error_message");

    if (!isOnline) {
      showToast("🚫 No internet connection! Check your network.", "error");
      return;
    }

    // 🔄 Loading state
    urlShortenerBtn.textContent = "Shortening...";
    urlShortenerBtn.classList.add("loading");

    try {
      const shortenedUrl = await shortenUrl(input.value);

      if (shortenUrl !== undefined) {
        /* Save to localStorage */
        const savedUrl = saveUrl(input.value, shortenedUrl);

        /* Render to UI */
        renderUrl(savedUrl, urlsWrapper);

        showToast("Url shortened successfully!");

        /* Show Clear All immediately */
        const updatedUrls = getStoredUrls();
        toggleClearAllBtn(clearAllBtn, updatedUrls.length > 1);

        input.value = "";
      }
    } catch (err) {
      showToast("Failed to shorten URL. Try again.");
    } finally {
      urlShortenerBtn.textContent = "Shorten";
      urlShortenerBtn.classList.remove("loading");
    }
  });

  /* Clear All */
  clearAllBtn.addEventListener("click", () => {
    clearAllUrls();
    clearUrlsUI(urlsWrapper);

    /* Hide Clear All */
    toggleClearAllBtn(clearAllBtn, false);

    showToast("You've cleared your storage successfully!");

    window.location.reload();
  });
});
