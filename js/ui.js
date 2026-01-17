export function renderUrl({ originalUrl, shortenedUrl }, wrapper) {
  const div = document.createElement("div");

  div.classList.add("url");

  div.innerHTML = `
    <span class="original_url">${originalUrl}</span>
    <div class="shortened_url_wrapper">
      <span class="shortened_url">${shortenedUrl}</span>
      
      <div class="url_actions">
        <button class="copy_url_btn" data-url="${shortenedUrl}">
          Copy
        </button>

        <button class="delete_url_btn" data-url="${shortenedUrl}">
          Delete
        </button>
      </div>
    </div>
  `;

  wrapper.appendChild(div);
}

export function clearUrlsUI(wrapper) {
  wrapper.innerHTML = "";
}

export function toggleClearAllBtn(button, hasUrls) {
  button.style.display = hasUrls ? "flex" : "none";
}

let toastTimeout;

export function showToast(message, type = "success") {
  let toast = document.getElementById("toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}


