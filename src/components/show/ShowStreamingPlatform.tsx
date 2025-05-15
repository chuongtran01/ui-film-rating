import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const streamingPlatforms = [
  { id: 1, name: "Netflix", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", link: "https://www.netflix.com" },
  { id: 2, name: "Amazon Prime", thumbnail: "https://m.media-amazon.com/images/I/31W9hs7w0JL.png", link: "https://www.amazon.com/prime" },
  { id: 3, name: "Disney+", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", link: "https://www.disneyplus.com" },
  { id: 4, name: "Hulu", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", link: "https://www.hulu.com" },
  { id: 5, name: "Apple TV+", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", link: "https://www.apple.com/tv/" },
  { id: 6, name: "Apple TV+", thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/75/Netflix_icon.svg", link: "https://www.apple.com/tv/" },
  // ...more videos
];
export default function ShowStreamingPlatform() {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl font-bold mr-2">Where to watch</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex gap-4 flex-wrap">
          {streamingPlatforms.map((platform) => (
            <div key={platform.id} className="flex items-center gap-4 min-w-[240px] bg-white">
              <img src={platform.thumbnail} alt={platform.name} className="size-[4rem] object-cover border" />
              <div>
                <Link href={platform.link} className="text-blue-700 font-semibold hover:underline">
                  {platform.name}
                </Link>
                <div className="text-gray-500 text-sm">Subscription (sub)</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
