import Image from "next/image";
import MovieTable from "./_components/movie-table";
import ProfileDropdown from "./_components/profile-dropdown";

export default function AdminDashboard() {
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
          <MovieTable />
        </div>
      </main>
    </div>
  );
}
