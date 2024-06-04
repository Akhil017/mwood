import ImageBackground from "@/components/image-background";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOODS } from "@/lib/constants";
import Image from "next/image";
import { YoutubePlayer } from "./components/youtube-player";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MoviePageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Movie({ searchParams }: MoviePageProps) {
  const mood = MOODS.find((mood) => mood.mood === searchParams.mood);

  return (
    <ImageBackground>
      <div className="space-y-8 lg:space-y-10">
        <div className="flex flex-col gap-4 items-center justify-center text-center">
          <Image src="/logo.svg" width={40} height={40} alt="logo" />
          <div className="flex gap-2">
            <h1 className="text-xl lg:text-2xl font-semibold text-foreground flex gap-2 items-center">
              Feeling {mood ? mood?.icon : null}
              {mood ? mood?.mood : null}
            </h1>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-center p-4">
                <YoutubePlayer />
              </div>
              <CardHeader className="pt-0 space-y-4">
                <CardTitle className="text-lg">Avesham</CardTitle>
                <div className="flex h-5 items-center space-x-4 text-sm font-medium">
                  <div>2018</div>
                  <Separator orientation="vertical" />
                  <div>2h 32min</div>
                  <Separator orientation="vertical" />
                  <div className="flex gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <path
                        fill="#FCD53F"
                        d="m18.7 4.627l2.247 4.31a2.27 2.27 0 0 0 1.686 1.189l4.746.65c2.538.35 3.522 3.479 1.645 5.219l-3.25 2.999a2.225 2.225 0 0 0-.683 2.04l.793 4.398c.441 2.45-2.108 4.36-4.345 3.24l-4.536-2.25a2.282 2.282 0 0 0-2.006 0l-4.536 2.25c-2.238 1.11-4.786-.79-4.345-3.24l.793-4.399c.14-.75-.12-1.52-.682-2.04l-3.251-2.998c-1.877-1.73-.893-4.87 1.645-5.22l4.746-.65a2.23 2.23 0 0 0 1.686-1.189l2.248-4.309c1.144-2.17 4.264-2.17 5.398 0"
                      />
                    </svg>
                    7.3 / <span className="text-muted-foreground">10</span>
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Badge variant="secondary" className="rounded-full">
                    Adventure
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Comedy
                  </Badge>
                  <Badge variant="secondary" className="rounded-full">
                    Action
                  </Badge>
                </div>
                <CardDescription>
                  Quis ad ipsum tempor labore ad in eiusmod duis aliqua.
                  Proident esse proident labore quis dolore exercitation
                  incididunt nulla reprehenderit nisi cupidatat sunt. Duis ut ut
                  est culpa laborum cillum. Dolore et tempor nisi labore non.
                </CardDescription>
              </CardHeader>
            </CardContent>
          </Card>
        </div>
      </div>
    </ImageBackground>
  );
}
