import Link from "next/link";
import React from "react";

export interface Show {
  id: number;
  title: string;
  year: string | number;
  rating: number;
  imageUrl?: string;
}

export default function TrendingCard({ movie }: { movie: Show }) {
  const { id, title, year, rating, imageUrl } = movie;

  return (
    <Link href={`/show/${id}`} className="block group">
      <div className="overflow-hidden flex flex-col cursor-pointer group-hover:shadow-xl transition-shadow active:opacity-80">
        <div className="bg-gray-200 flex items-center justify-center" style={{ height: 270 }}>
          {imageUrl ? <img src={imageUrl} alt={title} className="object-cover w-full h-full" /> : <span className="text-gray-400 text-2xl">300 × 450</span>}
        </div>
        <div className="pt-5 flex flex-col flex-1 justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-yellow-400">{rating.toFixed(1)}</span>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-lg mb-1 truncate">{title}</div>
            <div className="text-gray-400 text-sm mb-2">{year}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
