import React, { useState } from "react";
import TrendingTabs from "@/components/trendings/TrendingTabs";
import TrendingCard, { Show } from "@/components/trendings/TrendingCard";

const movies: Show[] = [
  { id: 1, title: "The Last Voyage", year: 2025, rating: 4.8 },
  { id: 2, title: "Eternal Echo", year: 2024, rating: 4.5 },
  { id: 3, title: "Cobalt Sky", year: 2024, rating: 4.7 },
  { id: 4, title: "Midnight Protocol", year: 2025, rating: 4.3 },
];

export default function Trending() {
  const [selected, setSelected] = useState("All");

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-white mb-2">Trending Now</h2>
          <p className="text-gray-400">Discover what's popular among our community this week.</p>
        </div>
        <TrendingTabs selected={selected} onSelect={setSelected} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {movies.map((movie, i) => (
            <TrendingCard key={i} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
