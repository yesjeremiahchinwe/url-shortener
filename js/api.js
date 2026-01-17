import { showToast } from "./ui.js";

export async function shortenUrl(longUrl) {
  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    )

    if (!response.ok) {
       showToast("Error Occured: ", "error");
       return
    }
     
    const result = await response.text()

    return result

  } catch (error) {
    showToast("Error Occured: ", "error");
    return
  }
}