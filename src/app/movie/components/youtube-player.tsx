"use client";

import YouTube, { YouTubeProps } from "react-youtube";

export function YoutubePlayer() {
  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    event.target.pauseVideo();
  };

  const opts: YouTubeProps["opts"] = {
    height: "280",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <YouTube
      videoId="L0yEMl8PXnw"
      opts={opts}
      onReady={onPlayerReady}
      style={{ width: "100%" }}
    />
  );
}
