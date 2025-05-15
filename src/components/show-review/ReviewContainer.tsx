"use client";

import React, { useRef, useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, Star, ThumbsUp, MessageCircle, FlagTriangleLeft, FlagTriangleRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ReviewScoreContainer from "@/components/ReviewScoreContainer";

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
    <Card key={review.id} className="p-4 max-w-2xl w-full flex flex-col gap-4">
      {/* Top row: badge and rating and title */}
      <CardHeader className="p-0 flex flex-row items-center gap-4">
        <ReviewScoreContainer score={review.rating} className="h-10 w-10 text-xl" />
        <CardDescription className="text-black font-bold text-lg">{review.title}</CardDescription>
      </CardHeader>

      {/* Review text with review and reviewer */}
      <CardContent className="p-0">
        <div className="relative mb-4 text-sm">
          <div ref={textRef} className={`text-gray-800 transition-all duration-300 ${expanded ? "" : "overflow-hidden"}`} style={!expanded ? { maxHeight: `${MAX_HEIGHT}px` } : undefined}>
            {review.reviewText}
          </div>
          {!expanded && showViewMore && (
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent flex items-end justify-center pointer-events-none">
              <Button className="relative z-10 pointer-events-auto bg-white border border-gray-300 text-primary font-semibold mt-2 hover:bg-gray-100" onClick={() => setExpanded(true)}>
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
      <CardFooter className="p-0 flex flex-row items-center justify-between">
        <div className="flex items-center gap-6 text-gray-600 text-sm border-gray-200 pt-2">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 cursor-pointer hover:text-black" /> Helpful · {review.helpful}
          </span>
          <span className="flex items-center gap-1 cursor-pointer hover:text-black">
            <MessageCircle className="w-4 h-4" /> {review.comments}
          </span>
        </div>
        <div className="text-gray-600 text-sm cursor-pointer flex items-center gap-1 hover:text-black">
          <FlagTriangleRight className="w-4 h-4" /> Report
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReviewContainer;
