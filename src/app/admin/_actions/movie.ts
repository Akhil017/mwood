"use server";

import prisma from "@/db";
import { Movie } from "@/lib/schema";
import { revalidatePath } from "next/cache";

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
  // revalidatePath("/admin");
}

export async function updateMovie(formData: Movie) {
  await prisma.movie.update({
    where: {
      title: formData.title,
    },
    data: formData,
  });

  revalidatePath("/admin");
}

export async function addGenre(genres: Array<{ name: string }>) {
  return await prisma.genre.createMany({ data: genres });
}

export async function getMovies() {
  return await prisma.$transaction([
    prisma.movie.count(),
    prisma.movie.findMany(),
  ]);
}

export async function getGenres() {
  return await prisma.genre.findMany();
}
