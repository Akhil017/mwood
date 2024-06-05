import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto w-full mt-24 lg:mt-10 p-4">
      <div className="flex justify-between mb-4">
        <Skeleton className="h-10 w-full rounded-lg bg-secondary" />
      </div>
      <Card className="">
        <CardContent className="p-0">
          <div className="flex items-center justify-center px-4 h-[360px]">
            <Skeleton className="h-[330px] w-full rounded-lg bg-secondary" />
          </div>
          <CardHeader className="pt-0 space-y-4">
            <CardTitle className="text-lg">
              <Skeleton className="h-8 w-[350px] rounded-lg bg-secondary" />
            </CardTitle>
            <div className="flex h-5 items-center space-x-4 text-sm font-medium">
              <Skeleton className="h-6 w-[50px] rounded-md bg-secondary" />
              <Separator orientation="vertical" />
              <Skeleton className="h-6 w-[50px] rounded-md bg-secondary" />
              <Separator orientation="vertical" />
              <div className="flex gap-1">
                <Skeleton className="h-6 w-[50px] rounded-md bg-secondary" />
              </div>
            </div>
            <div className="flex gap-2 lg:gap-4 flex-wrap">
              <Skeleton className="h-6 w-[50px] rounded-full bg-secondary" />
              <Skeleton className="h-6 w-[50px] rounded-full bg-secondary" />
              <Skeleton className="h-6 w-[50px] rounded-full bg-secondary" />
            </div>
            <CardDescription className="space-y-1">
              <Skeleton className="h-4 w-full rounded-md bg-secondary" />
              <Skeleton className="h-4 w-full rounded-md bg-secondary" />
              <Skeleton className="h-4 w-full rounded-md bg-secondary" />
            </CardDescription>
          </CardHeader>
        </CardContent>
        <CardFooter className="justify-end">
          <Skeleton className="h-[36px] w-[100px] rounded-md bg-secondary" />
        </CardFooter>
      </Card>
    </div>
  );
}
