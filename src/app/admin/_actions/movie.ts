"use server";

import prisma from "@/db";
import { Movie } from "@/lib/schema";

export async function addMovie(formData: Movie) {
  return await prisma.movie.create({
    data: {
      title: formData.title,
      imdbRating: formData.imdbRating,
      plot: formData.plot,
      poster: formData.poster || "",
      runtime: formData.runtime,
      trailer: formData.trailer || "",
      year: formData.year,
      genre: formData.genre,
    },
  });
}

export async function addGenre(movies: Array<{ name: string }>) {
  return await prisma.genre.createMany({ data: movies });
}

export async function getMovies() {
  return await prisma.$transaction([
    prisma.movie.count(),
    prisma.movie.findMany({
      skip: 0,
      take: 5,
    }),
  ]);
}
