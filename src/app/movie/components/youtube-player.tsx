"use client";

import YouTube, { YouTubeProps } from "react-youtube";

type YoutubePlayerProps = {
  videoId: string;
};

export function YoutubePlayer({ videoId }: YoutubePlayerProps) {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "340",
    width: "100%",
    playerVars: {
      autoplay: 1,
      rel: 0,
    },
  };

  return (
    <YouTube
      videoId={videoId}
      opts={opts}
      onReady={onPlayerReady}
      style={{ width: "100%" }}
    />
  );
}
