"use server";

import prisma from "@/db";
import { FormSchema } from "@/lib/schema";
import { z } from "zod";

export async function addMovie(formData: z.infer<typeof FormSchema>) {
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
