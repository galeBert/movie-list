"use client";
import { DialogContent } from "@radix-ui/react-dialog";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";

type MovieDetails = {
  title: string;
  status: string;
  release_date: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: string;
  vote_count: string;
  runtime: string;
  overview: string;
  videoId?: string;
  genres: {
    id: number;
    name: string;
  }[];
};
export default function MovieDetailModal({ id }: { id: string }) {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const movieDetails = axios.get(`api/movie/${id}/details`);
      movieDetails.then(async (details) => {
        const videoId = await axios.get(`api/movie/${id}/videos`);

        setDetails((prev) => ({
          ...prev,
          ...details.data,
          videoId: videoId.data.results?.[0]?.key ?? null,
        }));
      });
    }
  }, [id]);

  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <div className="w-full flex flex-col space-y-6">
      <DialogHeader>
        <DialogTitle>{details?.title}</DialogTitle>
      </DialogHeader>
      <DialogContent className="flex flex-col space-y-4">
        <div className="relative w-full">
          {details?.videoId ? (
            <YouTube
              videoId={details.videoId}
              iframeClassName="aspect-video w-full"
            />
          ) : (
            <div>video not availalbe</div>
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-1">
            <Label>Rating:</Label>
            <Label>
              {details?.vote_average}/10 ({details?.vote_count} votes)
            </Label>
          </div>
          <div className="flex space-x-1">
            <Label>Status:</Label>
            <Label>{details?.status}</Label>
          </div>
        </div>
        <DialogDescription>{details?.overview}</DialogDescription>
      </DialogContent>
    </div>
  );
}
