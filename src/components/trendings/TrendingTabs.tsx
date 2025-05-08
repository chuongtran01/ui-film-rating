import React from "react";

const categories = ["All", "Action", "Drama", "Comedy", "Sci-Fi"];

export default function TrendingTabs({ selected = "All", onSelect }: { selected?: string; onSelect?: (cat: string) => void }) {
  return (
    <div className="flex justify-center gap-4 mb-8">
      {categories.map((cat) => (
        <button
          key={cat}
          className={selected === cat ? "px-5 py-2 rounded-full bg-yellow-400 text-black font-semibold" : "px-5 py-2 rounded-full text-gray-400 font-semibold hover:text-white"}
          onClick={() => onSelect && onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
