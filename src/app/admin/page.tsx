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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, X } from "lucide-react";
import Image from "next/image";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { z } from "zod";
import { addMovie } from "./_actions/movie";
import { useFormStatus } from "react-dom";

const FormSchema = z
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

export type FormSchemaType = z.infer<typeof FormSchema>;

export default function Admin() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      genre: [],
      poster: "",
      trailer: "",
    },
  });

  function onSubmit(data: FormSchemaType) {
    console.log({ data });
    addMovie(data);
  }

  const handleSelectGenre = (
    selectedGenre: string,
    isSelected: boolean,
    field: ControllerRenderProps<FormSchemaType, "genre">
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
    field: ControllerRenderProps<FormSchemaType, "genre">
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
                  {/* <Button type="submit" className="w-full">
                    Save
                  </Button> */}
                  <SubmitButton />
                </form>
              </Form>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}
