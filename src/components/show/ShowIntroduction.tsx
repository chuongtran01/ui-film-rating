"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ShowIntroductionProps {
  posterUrl: string;
  title: string;
  year: number | string;
  rating: number;
  duration: string;
  ageRating: string;
  genres: string[];
  plot: string;
  director: { name: string; url?: string };
  writer: { name: string; url?: string };
  stars: { name: string; url?: string }[];
}

export default function ShowIntroduction({ posterUrl, title, year, rating, duration, ageRating, genres, plot, director, writer, stars }: ShowIntroductionProps) {
  return (
    <Card className="flex flex-col md:flex-row gap-8 p-6 border-none shadow-lg rounded-none bg-gradient-to-r from-gray-900 to-gray-800 transition-colors">
      {/* Poster */}
      <div className="flex-shrink-0 w-full md:w-60">
        <img src={posterUrl} alt={title} className="w-full h-auto rounded-lg object-cover" crossOrigin="anonymous" />
      </div>
      {/* Details */}
      <div className="flex-1 flex flex-col">
        {/* Title and meta */}
        <div>
          <h1 className="text-4xl font-extrabold text-white mb-2">{title}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-4">
            <span>{year}</span>
            <span>•</span>
            <span>{ageRating}</span>
            <span>•</span>
            <span>{duration}</span>
            <span className="flex items-center gap-1">
              <span className="text-yellow-400">★</span>
              <span className="text-white font-semibold">{rating.toFixed(1)}</span>
            </span>
          </div>
        </div>
        {/* Genres */}
        <div className="flex flex-wrap gap-2 mb-4">
          {genres.map((genre) => (
            <Badge key={genre} variant="outline" className="text-primary-foreground cursor-pointer transition-colors hover:opacity-80">
              {genre}
            </Badge>
          ))}
        </div>
        {/* Plot */}
        <p className="text-gray-300 mb-4">{plot}</p>
        <Separator className="my-4" />
        {/* Crew */}
        <div className="mb-2">
          <span className="text-gray-400">Director: </span>
          {director.url ? (
            <Link href={director.url} className="text-blue-400 hover:underline">
              {director.name}
            </Link>
          ) : (
            <span className="text-white">{director.name}</span>
          )}
          <Separator className="my-4" />
        </div>
        <div className="mb-2">
          <span className="text-gray-400">Writer: </span>
          {writer.url ? (
            <Link href={writer.url} className="text-blue-400 hover:underline">
              {writer.name}
            </Link>
          ) : (
            <span className="text-white">{writer.name}</span>
          )}
        </div>
        {/* Actions */}
        <div className="flex gap-4 mt-4">
          <button className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full hover:bg-yellow-300 transition">+ Add to list</button>
          <button className="bg-gray-700 text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-600 transition">Mark as watched</button>
        </div>
      </div>
    </Card>
  );
}
