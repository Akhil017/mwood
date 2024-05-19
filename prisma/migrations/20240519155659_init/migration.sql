-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "imdbRating" DOUBLE PRECISION NOT NULL,
    "released" TIMESTAMP(3) NOT NULL,
    "runtime" INTEGER NOT NULL,
    "genre" TEXT[],
    "director" TEXT NOT NULL,
    "actors" TEXT[],
    "plot" TEXT NOT NULL,
    "poster" TEXT NOT NULL,
    "trailer" TEXT NOT NULL,
    "ratings" JSONB NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);
