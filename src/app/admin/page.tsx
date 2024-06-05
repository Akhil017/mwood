import { getMovies } from "./_actions/movie";
import { DataTable } from "./_components/data-table";
import { movieTableColumns } from "./_components/movie-table-columns";

export default async function AdminDashboard() {
  const [movieCount, movies] = await getMovies();
  console.log({ movieCount, movies });

  return (
    <div className="bg-background min-h-[calc(100vh_-_theme(spacing.16))] p-4 ">
      <DataTable
        data={movies}
        // data={null}
        columns={movieTableColumns}
        rowCount={movieCount}
      />
    </div>
  );
}
