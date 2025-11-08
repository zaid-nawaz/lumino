"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export default function CustomPlayer({ videoid }: { videoid: string }) {
  useEffect(() => {
    // Load YouTube Iframe API
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    let player: any;
    let duration = 0;

    window.onYouTubeIframeAPIReady = function () {
      player = new window.YT.Player("player", {
        videoId: videoid,
        playerVars: {
          controls: 1, // show default YouTube controls
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
        },
        events : {
          onReady : onPlayerReady
        }
      });
    };

  function onPlayerReady(){
    duration = player.getDuration();
    setInterval(updateProgress,1000);
  }

  function updateProgress(){
    const current = player.getCurrentTime()
    const videoPlayerCard = document.getElementById("videoplayercard");
    const genaiblock = document.getElementById("genaiblock");
    if(Math.floor(current) == duration - 1){
      if(videoPlayerCard) videoPlayerCard.style.display = "none";
      if(genaiblock) genaiblock.style.display = "block";
    }
  }
  }, [videoid]);



  return (
    <div>

      <div id="player"></div>
    </div>
    
  );
}
