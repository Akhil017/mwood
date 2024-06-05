import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { YoutubePlayer } from "./components/youtube-player";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ChevronsRight } from "lucide-react";
import { getGenreByMood, getMoviesByGenres } from "./actions";
import MovieInfo from "./components/movie-info";

interface MoviePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default async function Movie({ searchParams }: MoviePageProps) {
  const mood = searchParams.mood as string;
  const genre = await getGenreByMood(mood);
  const genres = genre.map((g) => g.name);
  const movies = await getMoviesByGenres(genres);
  console.log({ mood, genres });
  return (
    <div className="max-w-2xl mx-auto w-full mt-32 lg:mt-16 p-4">
      <ScrollArea className="min-h-[90vh]">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl lg:text-2xl font-semibold text-foreground flex gap-2 items-center">
            Feeling {mood}
            <Image
              alt={`${mood} emoji`}
              src={`/images/${mood?.toLowerCase?.()}.png`}
              height={32}
              width={32}
            />
          </h1>
          <Link
            className="bg-primary text-sm flex items-center font-medium px-2 rounded-md text-black"
            href="/"
          >
            Change Mood
          </Link>
        </div>
        <MovieInfo movies={movies} />
      </ScrollArea>
    </div>
  );
}
