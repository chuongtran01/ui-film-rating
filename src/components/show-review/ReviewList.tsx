"use client";

import React, { useState } from "react";
import ReviewContainer, { Review } from "./ReviewContainer";
import { ChevronLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetTrigger } from "../ui/sheet";
import AddShowReview from "./AddShowReview";

const reviews: Review[] = [
  {
    id: 1,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 9,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ...',
    helpful: 12,
    comments: 3,
  },
  {
    id: 2,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 9,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ...',
    helpful: 12,
    comments: 3,
  },
  {
    id: 3,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 9,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ...',
    helpful: 12,
    comments: 3,
  },
  // Add more reviews as needed
];

const sortOptions = [
  { label: "Most Helpful", value: "most-helpful" },
  { label: "Most Recent", value: "most-recent" },
];

const ratingOptions = [
  { label: "All", value: "all" },
  { label: "1 star", value: "1" },
  { label: "2 stars", value: "2" },
  { label: "3 stars", value: "3" },
  { label: "4 stars", value: "4" },
  { label: "5 stars", value: "5" },
  { label: "6 stars", value: "6" },
  { label: "7 stars", value: "7" },
  { label: "8 stars", value: "8" },
  { label: "9 stars", value: "9" },
  { label: "10 stars", value: "10" },
];

export default function ReviewList() {
  const [hideSpoilers, setHideSpoilers] = useState(false);
  const [sort, setSort] = useState("most-helpful");
  const router = useRouter();

  return (
    <div className="min-h-screen w-full mt-12">
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 transition-colors w-full">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
          <div className="flex items-center gap-1 hover:opacity-80 cursor-pointer" onClick={() => router.back()}>
            <Button variant="ghost" className="text-white p-0">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <h2 className="text-white text-xl font-semibold">Back</h2>
          </div>
          <div className="flex items-center gap-4">
            <img
              src="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg"
              alt="Warfare"
              className="w-20 h-28 rounded-lg object-cover shadow"
            />
            <div>
              <div className="text-gray-300 text-2xl font-semibold">Warfare</div>
              <div className="text-white text-4xl font-bold mt-2">User reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls section */}
      <div className="bg-white border-b border-gray-200 w-full">
        <div className="container mx-auto px-4 py-4 grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <span className="text-black text-lg font-semibold">224 reviews</span>
            <label className="flex items-center gap-2 text-black text-base cursor-pointer">
              <Checkbox id="hide-spoilers" checked={hideSpoilers} onCheckedChange={() => setHideSpoilers((v) => !v)} />
              <label htmlFor="hide-spoilers" className="text-black text-base cursor-pointer">
                Hide spoilers
              </label>
            </label>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4 justify-start md:justify-end flex-wrap">
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="border border-gray-300 rounded px-2 py-1 text-base gap-2">
                  <SelectValue placeholder="Show all" />
                </SelectTrigger>
                <SelectContent>
                  {ratingOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="border border-gray-300 rounded px-2 py-1 text-base gap-2">
                  <SelectValue placeholder="Most Helpful" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button className="bg-blue-600 text-white font-semibold flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-700">
                  <Plus className="w-4 h-4" /> Review
                </Button>
              </SheetTrigger>
              <AddShowReview />
            </Sheet>
          </div>
        </div>
      </div>

      {/* Review list with full-width background */}
      <div className="bg-[#f5f5f5] w-full">
        <div className="container mx-auto flex flex-col items-center gap-6 py-8 min-h-[60vh]">
          {reviews.map((review) => (
            <ReviewContainer key={review.id} review={review} handleOnHeaderClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}
