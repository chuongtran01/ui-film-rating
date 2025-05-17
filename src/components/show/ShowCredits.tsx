"use client";

import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const credits = [
  { id: 1, name: "Han Jun Hee", character: "Character 1", role: "Main Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.netflix.com" },
  { id: 2, name: "Kim Min Kyu", character: "Character 2", role: "Main Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.amazon.com/prime" },
  { id: 3, name: "Lee Jae Wook", character: "Character 3", role: "Main Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.disneyplus.com" },
  { id: 4, name: "Lee Hye Young", character: "Character 4", role: "Support Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.hulu.com" },
  { id: 5, name: "Lee Jae Wook", character: "Character 5", role: "Support Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.apple.com/tv/" },
  { id: 6, name: "Lee Jae Wook", character: "Character 6", role: "Guest Role", thumbnail: "https://i.mydramalist.com/BqDyVm.jpg", link: "https://www.apple.com/tv/" },
  // ...more credits
];

const directors = [
  { id: 1, name: "Director 1", link: "https://www.netflix.com" },
  { id: 2, name: "Director 2", link: "https://www.amazon.com/prime" },
];

const writers = [
  { id: 1, name: "Writer 1", link: "https://www.netflix.com" },
  { id: 2, name: "Writer 2", link: "https://www.amazon.com/prime" },
];

export default function ShowCredits() {
  const router = useRouter();

  return (
    <Card className="border-none shadow-none">
      <CardHeader className="px-0">
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl font-bold">Cast & Credits</CardTitle>
          <Link href="/" className="text-sm text-gray-500 hover:underline">
            View all
          </Link>
        </div>
        <Separator />
      </CardHeader>
      <CardContent className="p-0">
        <div className="flex gap-4 flex-wrap">
          {credits.map((credit) => (
            <div key={credit.id} className="flex items-start gap-4 min-w-[240px] bg-white">
              <img src={credit.thumbnail} alt={credit.name} className="w-[5rem] h-[7rem] object-cover border " />
              <div className="flex flex-col justify-start">
                <Link href={credit.link} className="text-blue-700 font-semibold hover:underline">
                  {credit.name}
                </Link>
                <span className="text-gray-500 text-sm">{credit.character}</span>
                <div className="text-gray-500 text-sm">{credit.role}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
