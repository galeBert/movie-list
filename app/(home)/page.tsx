import Banner, { Movie } from "@/components/banner";
import SmallMovieCard from "@/components/small-movie-card";

import { Label } from "@/components/ui/label";
import axios from "axios";
import { Key } from "react";

export default async function Home() {
  const latestMovies = await axios.get("http://localhost:3000/api/now-playing");
  const popular = await axios.get("http://localhost:3000/api/popular");

  return (
    <main className="flex items-start pt-20 min-h-screen space-y-3 container relative flex-col p-4">
      <div className="relative h-96 w-full">
        <Banner list={popular.data} />
      </div>
      <Label>Latest</Label>
      <div className="flex overflow-x-scroll w-full scrollbar-hide">
        <div className="flex space-x-4">
          {latestMovies.data.results.map(
            (movie: Movie, index: Key | null | undefined) => (
              <SmallMovieCard key={index} movie={movie} />
            )
          )}
        </div>
      </div>
    </main>
  );
}
