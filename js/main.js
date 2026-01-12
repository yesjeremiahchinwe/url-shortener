import { shortenUrl } from "./api.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlShortenerForm = document.getElementById("url_shortener_form");

  const urlShortenerInput = document.getElementById("url_shortener_input");

  const urlsWrapper = document.querySelector(".urls_wrapper");

  const inputErrorMessage = document.querySelector(".input_error_message");

  const mobileMenuIconWrapper = document.querySelector(".menu_icon");

  const mobileNavigation = document.querySelector(".mobile_nav");

  urlShortenerForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!urlShortenerInput.value || urlShortenerInput.value === "") {
      urlShortenerInput.classList.add("input_error");
      inputErrorMessage.classList.add("show_input_error_message");
    } else {
      urlShortenerInput.classList.remove("input_error");
      inputErrorMessage.classList.remove("show_input_error_message");
    }

    const result = await shortenUrl(urlShortenerInput.value);

    const childElement = document.createElement("div");

    childElement.classList.add("url");

    childElement.innerHTML = `<span class="original_url">${urlShortenerInput.value}</span>
            <div class="shortened_url_wrapper">
              <span class="shortened_url">${result}</span>

              <button class="copy_url_btn" data-url="${result}">Copy</button>
            </div>`;

    urlsWrapper.appendChild(childElement);
  });

  const copyBtns = document.querySelectorAll(".copy_url_btn");

  copyBtns.forEach((copyBtn) => {
    copyBtn.addEventListener("click", async () => {
      alert("Cliicked");
      
      const url = copyBtn.dataset.url;

      try {
        await navigator.clipboard.writeText(url);

        copyBtn.textContent = "Copied!";

        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 1500);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    });
  });

  mobileMenuIconWrapper.addEventListener("click", () => {
    mobileNavigation.classList.toggle("show_mobile_nav");
  });
});
