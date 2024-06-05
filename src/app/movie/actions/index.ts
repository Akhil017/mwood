"use server";

import prisma from "@/db";

export async function getMoviesByGenres(genres: string[]) {
  return await prisma.movie.findMany({
    where: {
      genre: {
        hasSome: genres,
      },
    },
  });
}

export async function getGenreByMood(mood: string) {
  return await prisma.genre.findMany({
    where: {
      mood,
    },
  });
}
