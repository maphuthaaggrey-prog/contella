export function getYouTubeEmbedUrl(url) {
    try {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`;
    } catch {
      return ""; 
    }
  }