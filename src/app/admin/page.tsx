import { Card, CardContent } from "@/components/ui/card";

export default function Admin() {
  return (
    <div className="bg-[url('/admin-bg.png')] bg-contain bg-center h-screen flex items-center justify-center ">
      <Card className="container">
        <CardContent className="w-full max-w-7xl min-h-[80vh]"></CardContent>
      </Card>
    </div>
  );
}
