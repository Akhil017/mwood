import ImageBackground from "@/components/image-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Laugh } from "lucide-react";
import Image from "next/image";

const MOODS = [
  { icon: <Laugh className="text-foreground" />, mood: "CHEERFUL" },
  { icon: <Laugh className="text-foreground" />, mood: "REFLECTIVE" },
  { icon: <Laugh className="text-foreground" />, mood: "GLOOMY" },
  { icon: <Laugh className="text-foreground" />, mood: "HUMOROUS" },
  { icon: <Laugh className="text-foreground" />, mood: "CHILL" },
  { icon: <Laugh className="text-foreground" />, mood: "ROMANTIC" },
  { icon: <Laugh className="text-foreground" />, mood: "ANGRY" },
  { icon: <Laugh className="text-foreground" />, mood: "THRILLED" },
];

export default function Admin() {
  return (
    <ImageBackground>
      <div className="space-y-8">
        <div className="flex flex-col gap-1 items-center justify-center text-center">
          <Image
            src="/logo-without-text.svg"
            width={40}
            height={40}
            alt="logo"
          />
          <h1 className="text-xl lg:text-4xl font-bold text-foreground">
            Get top rated malayalam movies based on your mood
          </h1>
          <p className="text-base lg:text-xl">How are you feeling today?</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MOODS.map((mood) => (
            <Card key={mood.mood} className="shadow-xs bg-secondary">
              <CardContent className="p-4 flex items-center flex-col justify-center gap-2">
                <CardHeader className="p-0">
                  <CardTitle className="text-sm lg:text-xl">
                    {mood.mood}
                  </CardTitle>
                </CardHeader>
                <div className="text-xs text-muted-foreground">{mood.icon}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ImageBackground>
  );
}
