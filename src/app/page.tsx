import { MOODS } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto w-full mt-4 lg:mt-8 p-4">
      <div className="mx-auto grid w-full max-w-6xl gap-2 ">
        <h1 className="text-white text-2xl lg:text-5xl font-semibold text-center">
          Discover top-rated malayalam movies based on your mood
        </h1>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-6 lg:mt-10">
        {MOODS.map((mood) => (
          <Link
            href={`/movie?mood=${mood}`}
            key={mood}
            className="shadow-xs bg-background hover:bg-primary hover:border-primary duration-300 rounded-xl group border"
          >
            <div className="p-4 flex items-center flex-col justify-center gap-2">
              <div className="p-0">
                <h4 className="text-foreground/80 text-sm lg:text-lg font-semibold group-hover:text-black">
                  {mood}
                </h4>
              </div>
              <div className="text-xs text-muted-foreground">
                <Image
                  alt={`${mood} emoji`}
                  src={`/images/${mood.toLowerCase()}.png`}
                  height={32}
                  width={32}
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
