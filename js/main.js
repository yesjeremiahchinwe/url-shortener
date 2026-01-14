import { shortenUrl } from "./api.js";
import { clearAllUrls, getStoredUrls, saveUrl } from "./storage.js";
import { clearUrlsUI, renderUrl, toggleClearAllBtn } from "./ui.js";
import { handleUrlActions } from "./actions.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("url_shortener_form");
  const input = document.getElementById("url_shortener_input");
  const urlsWrapper = document.querySelector(".urls_wrapper");
  const clearAllBtn = document.getElementById("clear_all_btn");
  const inputErrorMessage = document.querySelector(".input_error_message");
  const mobileMenuIconWrapper = document.querySelector(".menu_icon");
  const mobileNavigation = document.querySelector(".mobile_nav");

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

    const shortenedUrl = await shortenUrl(input.value);

    const newUrl = {
      originalUrl: input.value,
      shortenedUrl,
    };

    /* Save to localStorage */
    saveUrl(input.value, shortenedUrl);

    /* Render to UI */
    renderUrl(newUrl, urlsWrapper);

    
    /* Show Clear All immediately */
    toggleClearAllBtn(clearAllBtn, true);

    input.value = "";
  });

  /* Clear All */
  clearAllBtn.addEventListener("click", () => {
    clearAllUrls();
    clearUrlsUI(urlsWrapper);

     /* Hide Clear All */
    toggleClearAllBtn(clearAllBtn, false);
  });

  mobileMenuIconWrapper.addEventListener("click", () => {
    mobileNavigation.classList.toggle("show_mobile_nav");
  });
});
