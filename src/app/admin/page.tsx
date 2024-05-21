"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const FormSchema = z
  .object({
    title: z.string({ required_error: "Please give a movie title" }),
    year: z.number({ required_error: "Please give year of release" }),
    imdbRating: z.number({
      required_error: "Please give IMDB rating for the movie",
    }),
    runtime: z.number({ required_error: "Please runtime in minutes" }),
    genre: z.array(z.string({ required_error: "Please give the movie genre" })),
    plot: z.string({ required_error: "Please give plot of the movie" }),
    poster: z.string().optional(),
    trailer: z.string().optional(),
  })
  .refine((data) => data.poster || data.trailer, {
    message: "Either poster or trailer is required",
    path: ["poster", "trailer"],
  });

export default function Admin() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  return (
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center ">
      <Card className="max-w-7xl w-full py-16 ">
        <CardContent className="max-w-lg w-full p-0 m-auto">
          <CardHeader className="px-0 pt-0">
            <CardTitle>Add Movie</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Minnal Murali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="plot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plot</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell more about the movie"
                        className="resize-none min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <FormControl>
                      <Input placeholder="Minnal Murali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imdbRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IMDb Rating</FormLabel>
                    <FormControl>
                      <Input placeholder="7.8" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-8">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input placeholder="2021" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="runtime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Runtime</FormLabel>
                      <FormControl>
                        <Input placeholder="158" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="trailer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trailer</FormLabel>
                    <FormControl>
                      <Input placeholder="Minnal Murali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="poster"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Poster</FormLabel>
                    <FormControl>
                      <Input placeholder="Minnal Murali" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
