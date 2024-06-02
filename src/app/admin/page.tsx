import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { getMovies } from "./_actions/movie";
import { DataTable } from "./_components/data-table";
import { movieTableColumns } from "./_components/movie-table-columns";
import ProfileDropdown from "./_components/profile-dropdown";

type AdminDashboardProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function AdminDashboard({
  searchParams,
}: AdminDashboardProps) {
  console.log({ searchParams });
  const [movieCount, movies] = await getMovies();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-12 items-center gap-4 border-b bg-background px-4 md:px-6">
        <div>
          <Image
            src="/logo-without-text.svg"
            width={40}
            height={40}
            alt="logo"
          />
        </div>

        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
          <div className="flex-1 ml-auto  flex items-center justify-end">
            <ProfileDropdown />
          </div>
        </div>
      </header>
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-6">
        <div className="mx-auto grid w-full max-w-7xl gap-4 overflow-hidden">
          <Tabs defaultValue="movies">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="movies">Movies</TabsTrigger>
                <TabsTrigger value="genres">Genres</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="movies">
              <DataTable
                data={movies}
                columns={movieTableColumns}
                rowCount={movieCount}
              />
            </TabsContent>
            <TabsContent value="genres">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Genres</CardTitle>
                  <CardDescription>Manage your genres</CardDescription>
                </CardHeader>
                <CardContent>table goes here!</CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> genres
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
