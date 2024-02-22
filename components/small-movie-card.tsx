"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Movie, MovieList } from "./banner";
import Modal from "./modal";
import MovieDetailModal from "./movie-details";
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

export default function SmallMovieCard({ movie }: { movie: Movie }) {
  const [isOpen, setIsOpen] = useState("");
  const onClose = () => {
    setIsOpen("");
  };

  return (
    <>
      <Card className="w-44" onClick={() => setIsOpen(movie.id)}>
        <CardContent className="px-2 py-2">
          <div className="relative h-[200px] w-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              fill
              alt="Poster"
              objectFit="cover"
            />
          </div>
        </CardContent>
        <CardFooter>{movie.original_title}</CardFooter>
      </Card>
      <Modal isOpen={!!isOpen} onClose={onClose}>
        <MovieDetailModal id={isOpen} />
      </Modal>
    </>
  );
}
