"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Movie } from "@/lib/schema";
import { DataTableColumnHeader } from "./data-table/data-table-column-header";
import { DataTableRowActions } from "./data-table/data-table-row-actions";

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
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
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
      return (
        <div className="flex space-x-2">
          <span className="font-medium">{row.getValue("genre")}</span>
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
      <DataTableColumnHeader column={column} title="imdb Rating" />
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
      return (
        <div className="flex space-x-2">
          <span className="max-w-[50px] truncate font-medium">
            {row.getValue("runtime")}
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
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("trailer")}
          </span>
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
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("poster")}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
