import VideoPlayer from "@/component/videoplayer";
import axios from "axios";
import Progressbar from "@/component/Progressbar";
// import MCQSection from "@/component/MCQSection";

import prisma from "@/db";
import MCQSection from "@/component/MCQSection";

interface parameters {
  params: Promise<{
    courseid: string;
    videoid: string;
    itemCount: string;
  }>;
}

interface item {
  snippet: {
    title: string;
    playlistId: string;
  };
  contentDetails: {
    videoId: string;
  };
}

export default async function videos({ params }: parameters) {
  const resolved = await params;
  const videoid = resolved.videoid;
  let videoindex = 0;
  const itemCount = Number(resolved.itemCount);

  const response = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlistItems?part=contentDetails&part=snippet&maxResults=${itemCount}&playlistId=${resolved.courseid}&key=${process.env.API_KEY}`
  );

  const data = response.data;
  data.items.forEach((element: any, index: number) => {
    if (videoid === element.contentDetails.videoId) videoindex = index;
  });

  const questions_response = await axios.post("http://localhost:3000/api/mcq", {
    video_id: resolved.videoid,
  });

  const question_data = JSON.parse(questions_response.data.mcqs);

  const nextVideoHref =
    videoindex + 1 === 10
      ? `/`
      : `/courses/${data.items[videoindex].snippet.playlistId}/${itemCount}/${data.items[videoindex + 1].contentDetails.videoId}`;

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
     
      <div className="flex-1 flex flex-col items-center p-6">
        <div
          id="videoplayercard"
          className=" bg-white rounded-2xl shadow-md overflow-hidden mb-6"
        >
          <VideoPlayer videoid={resolved.videoid}  />
        </div>

    
        <div
          id="genaiblock"
          style={{ display: "none" }}
          className="w-full max-w-4xl bg-white rounded-2xl shadow-md p-6 mt-4"
        >
          <MCQSection
            question_data={question_data}
            nextVideoHref={nextVideoHref}
          />
        </div>
      </div>

    
      <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
        {/* Progress Section */}
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Course Progress
          </h3>
          <Progressbar value={50} />
        </div>

        {/* Playlist Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Playlist Content
          </h3>
          {data.items.map((playlist: item, index: number) => (
            <a
              href={`/courses/${playlist.snippet.playlistId}/${itemCount}/${playlist.contentDetails.videoId}`}
              key={index}
              className={`block rounded-xl p-3 transition ${
                playlist.contentDetails.videoId === videoid
                  ? "bg-blue-100 border border-blue-400"
                  : "hover:bg-gray-100 border border-transparent"
              }`}
            >
              <h4 className="text-sm font-medium leading-tight line-clamp-2">
                {playlist.snippet.title}
              </h4>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}



