const STORAGE_KEY = "url_shortener_links";

export function getStoredUrls() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveUrl(originalUrl, shortenedUrl) {
  const urls = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const newUrl = { originalUrl, shortenedUrl }

  urls.unshift(newUrl);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));

  return newUrl
}


export function deleteUrl(shortenedUrl) {
  const urls = getStoredUrls().filter(
    (url) => url.shortenedUrl !== shortenedUrl
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(urls));
}

export function clearAllUrls() {
  localStorage.removeItem(STORAGE_KEY);
}
