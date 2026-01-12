export async function shortenUrl(longUrl) {
  try {
    const response = await fetch(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`
    )
     
    const result = await response.text()

    return result

  } catch (error) {
    console.log("Error Occured: ", error);
  }
}
