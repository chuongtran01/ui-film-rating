"use client";

import React from "react";
import { Review } from "@/components/show-review/ReviewContainer";
import { useRouter } from "next/navigation";
import ReviewListHeader from "@/components/show-review/ReviewListHeader";
import ReviewListSummary from "@/components/show-review/ReviewListSummary";
import { Separator } from "@/components/ui/separator";
import ReviewListBody from "@/components/show-review/ReviewListBody";

const reviews: Review[] = [
  {
    id: 1,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 9,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ... True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. .. True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. .. True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ... True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. .. True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. .. True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ... True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. .. True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ..',
    helpful: 12,
    comments: 3,
  },
  {
    id: 2,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 5,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ...',
    helpful: 12,
    comments: 3,
  },
  {
    id: 3,
    title: "Politicians and CEO should be forced to watch this movie.",
    rating: 7,
    reviewText:
      'True "edge of your seat." Think of the tension of the first 15 minutes of "Saving Private Ryan," but over an hour and a half. No spoilers, but I love the fact that the movie immediately drops you into the situation. We don\'t need to know why the soldiers are there, or what their objective/mission is, because that\'s irrelevant when the bullets start to fly. These are just soldiers going on a mission. ...',
    helpful: 12,
    comments: 3,
  },
  // Add more reviews as needed
];

export default function ReviewList() {
  return (
    <div className="container mx-auto flex flex-col gap-6 py-8">
      <ReviewListHeader />
      <Separator />
      <ReviewListSummary />
      <ReviewListBody reviews={reviews} />
    </div>
  );
}
