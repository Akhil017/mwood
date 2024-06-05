import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto w-full mt-32 lg:mt-16 p-4 ">
      <div className="min-h-[90vh]">
        <div className="flex justify-between mb-4">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
        <div className="bg-card">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
