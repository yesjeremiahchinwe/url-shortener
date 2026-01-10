document.addEventListener("DOMContentLoaded", () => {
  const urlShortenerForm = document.getElementById("url_shortener_form");

  const urlShortenerInput = document.getElementById("url_shortener_input");

  const inputErrorMessage = document.querySelector(".input_error_message")

//   const copyBtns = document.querySelectorAll(".copy_url_btn");

//   copyBtns.forEach((copyBtn) => {
//     copyBtn.addEventListener("click", () => {});
//   });

  urlShortenerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!urlShortenerInput.value || urlShortenerInput.value === "") {
      urlShortenerInput.classList.add("input_error");
      inputErrorMessage.classList.add("show_input_error_message")
    }
  });
});
