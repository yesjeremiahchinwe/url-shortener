export function renderUrl({ originalUrl, shortenedUrl }, wrapper) {
  const div = document.createElement("div");
  
  div.classList.add("url");

  div.innerHTML = `
    <span class="original_url">${originalUrl}</span>
    <div class="shortened_url_wrapper">
      <span class="shortened_url">${shortenedUrl}</span>
      <button class="copy_url_btn" data-url="${shortenedUrl}">
        Copy
      </button>
    </div>
  `;

  wrapper.appendChild(div);
}
