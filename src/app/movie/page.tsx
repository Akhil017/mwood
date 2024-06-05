import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Link from "next/link";
import { getGenreByMood, getMoviesByGenres } from "./actions";
import MovieInfo from "./components/movie-info";
import { shuffleMovies } from "./utils";

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
  const shuffledMovies = shuffleMovies(movies);

  return (
    <div className="max-w-2xl mx-auto w-full mt-20 lg:mt-8 p-4">
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
      <MovieInfo movies={shuffledMovies || []} />
    </div>
  );
}
