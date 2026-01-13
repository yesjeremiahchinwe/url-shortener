import { shortenUrl } from "./api.js";
import { getStoredUrls, saveUrl } from "./storage.js";
import { renderUrl } from "./ui.js";
import { handleCopy } from "./copyToClipboard.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("url_shortener_form");
  const input = document.getElementById("url_shortener_input");
  const urlsWrapper = document.querySelector(".urls_wrapper");
  const inputErrorMessage = document.querySelector(".input_error_message");
  const mobileMenuIconWrapper = document.querySelector(".menu_icon");
  const mobileNavigation = document.querySelector(".mobile_nav");

  /* Load URLs from localStorage on page load */
  const storedUrls = getStoredUrls();
  storedUrls.forEach((url) => renderUrl(url, urlsWrapper));

  /* Enable copy functionality */
  handleCopy(urlsWrapper);

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

    input.value = "";
  });

  mobileMenuIconWrapper.addEventListener("click", () => {
    mobileNavigation.classList.toggle("show_mobile_nav");
  });
});
