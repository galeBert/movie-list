"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState } from "react";
import Modal from "./modal";
import MovieDetail from "./movie-details";
import { Button } from "./ui/button";

export type MovieList = {
  results: Movie[];
};
export type Movie = {
  poster_path: string;
  backdrop_path: string;
  original_title: string;
  overview: string;
  id: string;
};

export default function Banner({ list }: { list: MovieList }) {
  const [isOpen, setIsOpen] = useState("");
  const onClose = () => {
    setIsOpen("");
  };

  return (
    <>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full h-20"
      >
        <CarouselContent>
          {list.results?.map((movie, index) => (
            <>
              <CarouselItem
                className="h-96 w-full rounded-2xl overflow-hidden relative"
                key={index}
              >
                <div className="relative h-full w-full ">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    fill
                    alt={movie.original_title}
                  />
                </div>
                <div className="w-full h-full pointer-events-none rounded-l-2xl backdrop-blur-xl z-[1] absolute top-0">
                  <div className="w-3/4 h-full">
                    {/* <img
                      className="object-cover rounded-l-2xl h-full w-3/4"
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    /> */}
                    <Image
                      objectFit="cover"
                      fill
                      alt={movie.original_title}
                      className=" rounded-l-2xl h-full w-3/4"
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                    />
                  </div>
                </div>
                <div className="w-1/2 flex-col text-white justify-center space-y-3 items-end h-full flex py-4 px-10 right-0 z-[20] from-40% absolute rounded-l-2xl top-0 bg-gradient-to-l from-black">
                  <h1 className="text-5xl text-left">{movie.original_title}</h1>
                  <p className="text-right">{movie.overview}</p>
                  <Button
                    variant="secondary"
                    onClick={() => setIsOpen(movie.id)}
                  >
                    Details
                  </Button>
                </div>
              </CarouselItem>
            </>
          ))}
        </CarouselContent>
      </Carousel>
      <Modal isOpen={!!isOpen} onClose={onClose}>
        <MovieDetail id={isOpen} />
      </Modal>
    </>
  );
}
