"use client";

import React from "react";
import { Star, Info, Play, PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export interface Show {
  id: number;
  title: string;
  poster: string;
  rating: number;
  watchOptions?: boolean;
}

interface ShowListProps {
  shows: Show[];
  title: string;
}

export default function ShowList({ shows, title }: ShowListProps) {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-6 pt-6">{title}</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-screen-2xl w-full">
        {shows.map((show) => (
          <div key={show.id} className={`bg-[#18181b] rounded-xl shadow-lg flex flex-col items-center relative h-[420px]`}>
            {/* Poster */}
            <img
              src={show.poster}
              alt={show.title}
              className="w-full h-60 object-cover cursor-pointer hover:opacity-80 transition-all duration-300 rounded-t-xl"
              onClick={() => router.push(`show/${show.id}/`)}
            />
            {/* Card content with padding */}
            <div className="flex flex-col w-full px-3 pt-3 pb-2 h-full">
              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-400 text-sm mb-1 w-full">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                {show.rating}
              </div>

              {/* Title */}
              <div className="text-white font-semibold text-base mb-2 w-full truncate">{show.title}</div>

              {/* Actions */}
              <div className="flex flex-col gap-2 w-full h-full justify-center">
                <Button className="bg-[#23232b] text-blue-400 rounded-lg py-1 font-medium flex items-center justify-center gap-2 hover:bg-[#2c2c36] transition">
                  <PlusIcon className="w-4 h-4" /> Watchlist
                </Button>

                <div className="flex flex-row items-center gap-2 justify-between">
                  <Button variant="ghost" className="text-white rounded-lg py-1 font-medium flex items-center hover:bg-[#2c2c36] hover:text-white justify-center gap-2 transition">
                    <Play className="w-4 h-4" /> Trailer
                  </Button>
                  <Button variant="ghost" className="rounded-full p-2 hover:bg-[#2c2c36] transition">
                    <Info className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
