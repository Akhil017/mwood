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
import { z } from "zod";
import { useState } from "react";
import { toast } from "sonner";
import { FormSchema } from "@/lib/schema";

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
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      genre: [],
      poster: "",
      trailer: "",
    },
  });

  async function onSubmit(data: FormSchemaType) {
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
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center">
      <Card className="max-w-7xl w-full py-8 overflow-y-auto bg-secondary">
        <CardContent className="max-w-xl w-full m-auto">
          <ScrollArea className="h-[80vh] px-2"></ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
