export default function getYouTubeVideoId(url) {
  // First, create URL object to parse the input safely
  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (e) {
    return null; // Return null if URL is invalid
  }

  // Handle different YouTube URL formats:
  // 1. youtu.be/XDJNTnewPx8 (shortened)
  // 2. youtube.com/watch?v=XDJNTnewPx8 (standard)
  // 3. youtube.com/v/XDJNTnewPx8 (embedded)

  if (urlObj.hostname === "youtu.be") {
    // For shortened URLs, the ID is the pathname without the leading slash
    return urlObj.pathname.slice(1);
  } else if (urlObj.hostname.includes("youtube.com")) {
    // For standard URLs, get the 'v' parameter
    const videoId = urlObj.searchParams.get("v");
    console.log(videoId);
    if (videoId) return videoId;

    // For embedded URLs, get ID from pathname
    const matches = urlObj.pathname.match(/^\/v\/([^\/\?]+)/);
    console.log(matches[1]);
    if (matches) return matches[1];
  }

  return null; // Return null if no valid ID is found
}
