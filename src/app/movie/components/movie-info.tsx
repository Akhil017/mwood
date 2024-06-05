"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronsRight } from "lucide-react";
import { YoutubePlayer } from "./youtube-player";
import { Movie } from "@/lib/schema";
import { useState } from "react";
import { getVideoIdfromURL } from "../utils";
import { Button } from "@/components/ui/button";

type MovieInfoType = {
  movies: Movie[];
};

export default function MovieInfo({ movies }: MovieInfoType) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!movies.length) {
    return (
      <Card>
        <CardContent className="p-0 h-[400px] flex items-center justify-center">
          No movies found
        </CardContent>
      </Card>
    );
  }

  const videoId = movies[currentIndex]?.trailer
    ? getVideoIdfromURL(movies[currentIndex].trailer!)
    : "";

  const handleNext = () => {
    if (currentIndex + 1 >= movies.length) {
      return;
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  console.log({ m_l: movies.length, currentIndex });

  return (
    <Card>
      <CardContent className="p-0">
        <div className="flex items-center justify-center p-4 h-[360px]">
          {videoId ? <YoutubePlayer videoId={videoId} /> : null}
        </div>
        <CardHeader className="pt-0 space-y-4">
          <CardTitle className="text-lg">
            {movies[currentIndex].title}
          </CardTitle>
          <div className="flex h-5 items-center space-x-4 text-sm font-medium">
            <div>{movies[currentIndex].year}</div>
            <Separator orientation="vertical" />
            <div>{`${Math.floor(movies[currentIndex].runtime / 60)}h ${
              movies[currentIndex].runtime % 60
            }min`}</div>
            <Separator orientation="vertical" />
            <div className="flex gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 32 32"
              >
                <path
                  fill="#FCD53F"
                  d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.225 2.225 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.282 2.282 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"
                />
              </svg>
              {movies[currentIndex].imdbRating} /{" "}
              <span className="text-muted-foreground">10</span>
            </div>
          </div>
          <div className="flex gap-2 lg:gap-4 flex-wrap">
            {movies[currentIndex].genre.map((genre) => (
              <Badge
                key={genre}
                variant="outline"
                className="outline outline-primary rounded-full"
              >
                {genre}
              </Badge>
            ))}
          </div>
          <CardDescription>{movies[currentIndex].plot}</CardDescription>
        </CardHeader>
      </CardContent>
      <CardFooter className="justify-end">
        <Button
          className="bg-primary text-sm flex items-center font-medium py-2 px-6 rounded-md text-black"
          onClick={handleNext}
          disabled={currentIndex + 1 >= movies.length}
        >
          <ChevronsRight className="w-5 h-5" /> Next
        </Button>
      </CardFooter>
    </Card>
  );
}
