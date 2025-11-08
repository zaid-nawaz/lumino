import axios from "axios";
import Link from "next/link";

let playlist_id = [
  "PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW",
  "PLbtI3_MArDOkNtOan8BQkG6P8wf6pNVz-",
  "PL4cUxeGkcC9gC88BEo9czgyS72A3doDeM",
];

let playlist_id_string = "";

playlist_id.forEach((e) => {
  playlist_id_string += e;
  playlist_id_string += "&id=";
});

playlist_id_string = playlist_id_string.substring(0, playlist_id_string.length - 1);

interface playlistItem {
  id: string;
  contentDetails: {
    itemCount: number;
  };
  snippet: {
    title: string;
    thumbnails: {
      maxres: { url: string };
    };
  };
}

export default async function courses() {
  const response = await axios.get(
    `https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails&part=snippet&id=${playlist_id_string}&key=${process.env.API_KEY}`
  );

  const data = response.data;

  return (
    <main className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-10 px-6">
      {/* Search bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="🔍 Search for a course..."
            className="w-full px-5 py-3 rounded-full shadow-md border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>
      </div>

      {/* Course grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
        {data.items.map((playlist: playlistItem, index: number) => (
          <Link
            href={`/courses/${playlist.id}/${playlist.contentDetails.itemCount}`}
            key={index}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-xl w-72">
              <div className="relative">
                <img
                  src={playlist.snippet.thumbnails.maxres.url}
                  alt={playlist.snippet.title}
                  className="w-full h-44 object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-4">
                <h3 className="text-base font-semibold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                  {playlist.snippet.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {playlist.contentDetails.itemCount} videos
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
