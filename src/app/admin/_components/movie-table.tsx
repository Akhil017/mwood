import { DataTable } from "./data-table";
import { getMovies } from "../_actions/movie";
import { movieTableColumns } from "./movie-table-columns";

export default async function MovieTable() {
  const [movieCount, movies] = await getMovies();

  return (
    <DataTable
      data={movies}
      columns={movieTableColumns}
      rowCount={movieCount}
    />
  );
}
