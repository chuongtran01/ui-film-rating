"use client";

import React from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTopButton() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 bg-yellow-400 text-black rounded-full shadow-lg p-3 hover:bg-yellow-500 transition-colors"
      aria-label="Back to top"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
