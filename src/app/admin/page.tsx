import MovieTable from "./_components/movie-table";

export default function AdminDashboard() {
  return (
    <div className="bg-background px-8 min-h-[calc(100vh_-_theme(spacing.16))] py-4">
      <MovieTable />
    </div>
  );
}
