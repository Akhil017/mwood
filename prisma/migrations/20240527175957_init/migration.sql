/*
  Warnings:

  - You are about to drop the column `actors` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `director` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `ratings` on the `Movie` table. All the data in the column will be lost.
  - You are about to drop the column `released` on the `Movie` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "actors",
DROP COLUMN "director",
DROP COLUMN "ratings",
DROP COLUMN "released";

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);
