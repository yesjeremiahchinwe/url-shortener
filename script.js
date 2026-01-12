const shortenBtn = document.getElementById("shortenBtn");
const urlInput = document.getElementById("urlInput");
const errorMsg = document.getElementById("errorMsg");

shortenBtn.addEventListener("click", () => {
  if (urlInput.value.trim() === "") {
    errorMsg.textContent = "Please add a link";
    urlInput.style.border = "2px solid #f46262";
  } else {
    errorMsg.textContent = "";
    urlInput.style.border = "none";
    console.log("URL to shorten:", urlInput.value);
  }
});
