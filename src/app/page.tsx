"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Movie, MovieSchema } from "@/lib/schema";
import { prismaErrHandler } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { ControllerRenderProps, useForm } from "react-hook-form";
import { toast } from "sonner";

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
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center">
      <Card className="max-w-7xl w-full py-8 overflow-y-auto bg-secondary">
        <CardContent className="max-w-xl w-full m-auto">
          <ScrollArea className="h-[80vh] px-2"></ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
