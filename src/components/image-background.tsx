import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ReactNode } from "react";

export default function ImageBackground({ children }: { children: ReactNode }) {
  return (
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center">
      <Card className="max-w-7xl w-full py-8 overflow-y-auto bg-secondary">
        <CardContent className="max-w-xl w-full m-auto">
          <ScrollArea className="h-[80vh] px-2">{children}</ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
