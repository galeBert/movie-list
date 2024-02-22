"use client";
import { Movie } from "@/components/banner";
import SmallMovieCard from "@/components/small-movie-card";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Key, useEffect, useState } from "react";

export default function Search() {
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const q = searchParams.get("q");
  useEffect(() => {
    if (q) {
      const list = axios.get(`api/search?q=${q}`);
      list.then((res) => setMovies(res.data.results));
    }
  }, [q]);

  //   useEffect(() => {
  //     if (id) {
  //       const movieDetails = axios.get(`api/movie/${id}/details`);
  //       movieDetails.then(async (details) => {
  //         const videoId = await axios.get(`api/movie/${id}/videos`);

  //         setDetails((prev) => ({
  //           ...prev,
  //           ...details.data,
  //           videoId: videoId.data.results?.[0].key ?? null,
  //         }));
  //       });
  //     }
  //   }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="container flex flex-col overflow-auto items-center space-y-6 w-full h-full pt-20">
      <Label>Search for &apos;{q}&apos;</Label>
      <div className="grid mx-auto space-y-4 grid-cols-7 h-full w-full">
        {movies.map((movie: Movie, index: Key | null | undefined) => (
          <SmallMovieCard key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
}
