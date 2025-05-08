"use client";

import React, { useRef, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Star, ThumbsUp, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export interface Review {
  id: number;
  title: string;
  rating: number;
  reviewText: string;
  helpful: number;
  comments: number;
}

const MAX_HEIGHT = 240; // px, adjust as needed

const ReviewContainer = ({ review, handleOnHeaderClick }: { review: Review; handleOnHeaderClick: () => void }) => {
  const [expanded, setExpanded] = useState(false);
  const [showViewMore, setShowViewMore] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (textRef.current && textRef.current.scrollHeight > MAX_HEIGHT) {
      setShowViewMore(true);
    }
  }, []);

  return (
    <Card key={review.id} className="bg-white border border-gray-300 rounded-lg p-4 max-w-2xl w-full shadow-sm">
      {/* Top row: badge and rating and title */}
      <CardHeader className="p-0">
        <CardTitle>
          <div className="flex justify-between items-start">
            <span className="flex items-center gap-1 text-gray-500 font-semibold">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              {review.rating}/10
            </span>
          </div>
        </CardTitle>
        <CardDescription className="text-black">
          <div className="flex items-center font-bold text-lg mb-2 cursor-pointer hover:opacity-80" onClick={handleOnHeaderClick}>
            {review.title}
            <ChevronRight className="size-[1.5rem]font-bold" />
          </div>
        </CardDescription>
      </CardHeader>

      {/* Review text with review and reviewer */}
      <CardContent className="p-0">
        <div className="relative mb-4 text-sm">
          <div ref={textRef} className={`text-gray-800 transition-all duration-300 ${expanded ? "" : "overflow-hidden"}`} style={!expanded ? { maxHeight: `${MAX_HEIGHT}px` } : undefined}>
            {review.reviewText}
          </div>
          {!expanded && showViewMore && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none">
              <Button
                className="relative z-10 pointer-events-auto bg-white border border-gray-300 rounded px-3 py-1 text-blue-700 font-semibold mt-2 hover:bg-gray-100"
                onClick={() => setExpanded(true)}
              >
                View more
              </Button>
            </div>
          )}
        </div>
        <div className="text-gray-600 text-sm">
          Reviewed by{" "}
          <span className="font-bold cursor-pointer hover:underline" onClick={() => router.push(`/profile/${1}`)}>
            John Doe
          </span>{" "}
          on 2024-01-01
        </div>
      </CardContent>

      <Separator className="my-2" />

      {/* Bottom row: helpful and comments */}
      <CardFooter className="p-0">
        <div className="flex items-center gap-6 text-gray-600 text-sm border-gray-200 pt-2">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-black" /> Helpful · {review.helpful}
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-black">
            <MessageCircle className="w-4 h-4" /> {review.comments}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewContainer;
