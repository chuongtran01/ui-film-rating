"use client";

import Link from "next/link";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { ChevronRight } from "lucide-react";

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
    <div>
      <div className="flex items-center mb-4">
        <div className="border-l-4 border-yellow-400 h-10 mr-2"></div>
        <h2 className="text-2xl font-bold mr-2">Cast & Credits</h2>
      </div>
      <div className="flex gap-4 flex-wrap  mb-8">
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

      <Separator className="my-2" />
      <div>
        {/* Directors Row */}
        <div className="flex items-center mb-2 cursor-pointer justify-between group hover:opacity-80" onClick={() => router.push("/all-directors")}>
          <div className="flex items-center">
            <span className="font-bold text-black mr-2">Directors</span>
            <span className="flex flex-wrap items-center">
              {directors.map((director, idx) => (
                <span key={director.id} className="flex items-center">
                  <Link href={director.link} className="text-blue-700 hover:underline" onClick={(e) => e.stopPropagation()}>
                    {director.name}
                  </Link>
                  {idx < directors.length - 1 && <span className="mx-2 text-blue-700 text-xl">&middot;</span>}
                </span>
              ))}
            </span>
          </div>
          <ChevronRight className="size-[1.5rem]" />
        </div>

        <Separator className="my-2" />
        {/* Writers Row */}
        <div className="flex items-center mb-2 cursor-pointer justify-between group hover:opacity-80" onClick={() => router.push("/all-writers")}>
          <div className="flex items-center">
            <span className="font-bold text-black mr-2">Writers</span>
            <span className="flex flex-wrap items-center">
              {writers.map((writer, idx) => (
                <span key={writer.id} className="flex items-center">
                  <Link href={writer.link} className="text-blue-700 hover:underline" onClick={(e) => e.stopPropagation()}>
                    {writer.name}
                  </Link>
                  {idx < writers.length - 1 && <span className="mx-2 text-blue-700 text-xl">&middot;</span>}
                </span>
              ))}
            </span>
          </div>
          <ChevronRight className="size-[1.5rem]" />
        </div>
        <Separator className="my-2" />

        {/* All cast & crew */}
        <div className="flex items-center justify-between mb-2 font-bold text-black cursor-pointer hover:opacity-80" onClick={() => router.push("/all-cast-crew")}>
          <span>All cast & crew</span>
          <ChevronRight className="size-[1.5rem]" />
        </div>
        <Separator className="my-2" />
      </div>
    </div>
  );
}
