"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn, prismaErrHandler } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader, X } from "lucide-react";
import Image from "next/image";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { addMovie } from "./_actions/movie";
import { useState } from "react";
import { toast } from "sonner";
import { Movie, MovieSchema } from "@/lib/schema";

const GENRES = [
  {
    label: "Action",
    value: "Action",
  },
  {
    label: "Thriller",
    value: "Thriller",
  },
  {
    label: "Comedy",
    value: "Comedy",
  },
];

export default function Admin() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<Movie>({
    resolver: zodResolver(MovieSchema),
    defaultValues: {
      title: "",
      genre: [],
      poster: "",
      trailer: "",
    },
  });

  async function onSubmit(data: Movie) {
    setIsLoading(true);
    try {
      await addMovie(data);
      toast.success("Movie added successfully!");
      form.reset();
    } catch (error) {
      prismaErrHandler(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSelectGenre = (
    selectedGenre: string,
    isSelected: boolean,
    field: ControllerRenderProps<Movie, "genre">
  ) => {
    if (isSelected) {
      const updatedOptions = field.value.filter(
        (genre) => genre !== selectedGenre
      );
      field.onChange(updatedOptions);
    } else {
      const updatedOptions = [...field.value, selectedGenre];
      field.onChange(updatedOptions);
    }
  };

  const handleRemoveGenre = (
    genre: string,
    field: ControllerRenderProps<Movie, "genre">
  ) => {
    const filteredGenres = field.value.filter((g) => g !== genre);
    field.onChange(filteredGenres);
  };

  return (
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center ">
      <Card className="max-w-7xl w-full py-8 overflow-y-auto">
        <CardContent className="max-w-xl w-full m-auto">
          <ScrollArea className="h-[80vh] px-2 ">
            <div className="px-2 h-full ">
              <div className="flex items-center justify-center">
                <Image src="/logo.svg" width={60} height={60} alt="logo" />
              </div>
              <CardHeader className="px-0 pt-0 mt-4">
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
                      <FormItem className="flex flex-col">
                        <FormLabel>Genre</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="border w-full flex items-center justify-start text-muted-foreground"
                            >
                              select genre
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-full p-0" align="start">
                            <Command>
                              <CommandInput placeholder={""} />
                              <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                  {GENRES.map((option) => {
                                    const isSelected = field.value.includes(
                                      option.value
                                    );
                                    return (
                                      <CommandItem
                                        key={option.value}
                                        onSelect={() =>
                                          handleSelectGenre(
                                            option.value,
                                            isSelected,
                                            field
                                          )
                                        }
                                      >
                                        <div
                                          className={cn(
                                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                            isSelected
                                              ? "bg-primary text-primary-foreground"
                                              : "opacity-50 [&_svg]:invisible"
                                          )}
                                        >
                                          <CheckIcon className="h-4 w-4 text-foreground" />
                                        </div>

                                        <span>{option.label}</span>
                                      </CommandItem>
                                    );
                                  })}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <div className="flex gap-2 mt-2.5">
                          {field.value.map((genre) => (
                            <Badge
                              key={genre}
                              variant="secondary"
                              className="rounded-full"
                            >
                              {genre}
                              <X
                                className="w-3 h-3 ml-1 cursor-pointer"
                                onClick={() => handleRemoveGenre(genre, field)}
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
                            <Input
                              placeholder="7.8"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
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
                            <Input
                              placeholder="2021"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
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
                            <Input
                              placeholder="158"
                              {...field}
                              onChange={(e) => field.onChange(+e.target.value)}
                            />
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
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </div>
                    ) : (
                      "Save"
                    )}
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
