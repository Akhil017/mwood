import { z } from "zod";

export const FormSchema = z
  .object({
    title: z
      .string({ required_error: "Please give a movie title" })
      .min(1, { message: "Title should be minimum of length 1" }),
    year: z.number({ required_error: "Please give year of release" }),
    imdbRating: z.number({
      required_error: "Please give IMDB rating for the movie",
    }),
    runtime: z.number({ required_error: "Please runtime in minutes" }),
    genre: z
      .array(z.string({ required_error: "Please give the movie genre" }))
      .min(1, { message: "Select atleast one genre" }),
    plot: z.string({ required_error: "Please give plot of the movie" }),
    poster: z.string().optional(),
    trailer: z.string().optional(),
  })
  .superRefine((values, ctx) => {
    console.log({ values, ctx });

    if (!values.trailer && !values.poster) {
      ctx.addIssue({
        message: "Either poster or trailer should be filled in.",
        code: z.ZodIssueCode.custom,
        path: ["poster"],
      });
      ctx.addIssue({
        message: "Either poster or trailer should be filled in.",
        code: z.ZodIssueCode.custom,
        path: ["trailer"],
      });
    }
  });
