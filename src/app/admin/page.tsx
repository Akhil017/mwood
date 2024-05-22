"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";

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
      genre: [],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
  }

  function onGenreRemove(
    genre: string,
    field: ControllerRenderProps<z.infer<typeof FormSchema>, "genre">
  ) {
    const filteredGenres = field.value.filter((g) => g != genre);
    field.onChange(filteredGenres);
  }

  return (
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center ">
      <Card className="max-w-7xl w-full py-16 overflow-y-auto">
        <CardContent className="max-w-xl w-full m-auto ">
          <ScrollArea className="h-[70vh] px-2">
            <div className="px-2">
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
                            className="resize-none"
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
                        <Select
                          key={field.value[0] || ""}
                          onValueChange={(genre) => {
                            console.log({ genre });
                            field.onChange([...field.value, genre]);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="action">action</SelectItem>
                            <SelectItem value="thriller">thriller</SelectItem>
                            <SelectItem value="comedy">comedy</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="flex gap-2">
                          {field.value.map((genre) => (
                            <Badge variant="outline" key={genre}>
                              {genre}
                              <X
                                className="w-3 h-3 ml-1 cursor-pointer"
                                onClick={() => onGenreRemove(genre, field)}
                              />
                            </Badge>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex gap-8">
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
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
