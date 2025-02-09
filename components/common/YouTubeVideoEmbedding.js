import getYouTubeVideoId from "@/lib/getYouTubeVideoId";

export default function YouTubeVideo({ videoURL }) {
  const videoId = getYouTubeVideoId(videoURL);

  return (
    <div className="relative w-full h-full pt-[56.25%]">
      <iframe
        width="500"
        height="500"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-md"
      />
    </div>
  );
}
