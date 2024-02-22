import Banner, { Movie } from "@/components/banner";
import SmallMovieCard from "@/components/small-movie-card";

import axios from "axios";

export default async function Home() {
  const latestMovies = await axios.get(
    `${process.env.NEXT_API_HOST}/api/now-playing`
  );
  const popular = await axios.get(`${process.env.NEXT_API_HOST}/api/popular`);

  return (
    <main className="flex items-start pt-20 min-h-screen space-y-3 container relative flex-col p-4">
      <div className="relative h-96 w-full">
        <Banner list={popular?.data} />
      </div>
      <label>Latest</label>
      <div className="flex overflow-x-scroll w-full scrollbar-hide">
        <div className="flex space-x-4">
          {latestMovies?.data?.results.map((movie: Movie, index: number) => (
            <SmallMovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </main>
  );
}
