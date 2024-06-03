"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Movie } from "@/lib/schema";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table/data-table-row-actions";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const movieTableColumns: ColumnDef<Movie>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <div className="w-8">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <p className="w-[200px] font-medium">{row.getValue("title")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "genre",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Genre" />
    ),
    cell: ({ row }) => {
      const genres: string[] = row.getValue("genre");
      return (
        <div className="flex space-x-2">
          {genres.map((genre) => (
            <Badge key={genre} variant="outline" className="rounded-full">
              {genre}
            </Badge>
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: "plot",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plot" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <p className="w-[500px] font-medium">{row.getValue("plot")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("year")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "imdbRating",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="IMDb Rating" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("imdbRating")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "runtime",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Runtime" />
    ),
    cell: ({ row }) => {
      const runtime = Number(row.getValue("runtime"));

      if (isNaN(runtime)) {
        return null;
      }

      const hours = Math.floor(runtime / 60);
      const minutes = runtime % 60;

      return (
        <div className="flex space-x-2">
          <span className="max-w-[100px] truncate font-medium">
            {`${hours}h ${minutes}m`}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "trailer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trailer" />
    ),
    cell: ({ row }) => {
      return (
        <div className="w-[150px] truncate font-medium ">
          <a
            className="flex gap-2 items-center justify-start hover:text-blue-600"
            href={row.getValue("trailer")}
            target="_blank"
          >
            <ExternalLink className="w-4 h-4" /> trailer link
          </a>
        </div>
      );
    },
  },
  {
    accessorKey: "poster",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Poster" />
    ),
    cell: ({ row }) => {
      return (
        <div
          style={{
            position: "relative",
            width: `${70}px`,
            height: `${100}px`,
          }}
        >
          <Image
            src={row.getValue("poster")}
            alt={`${row.getValue("title")} poster`}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
