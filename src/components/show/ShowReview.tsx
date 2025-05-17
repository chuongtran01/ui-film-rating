"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { SheetTrigger, Sheet } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import AddShowReview from "@/components/show-review/AddShowReview";
import ReviewContainer, { Review } from "@/components/show-review/ReviewContainer";
import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CommonDialog from "@/components/common/CommonDialog";

const reviews: Review[] = [
  {
    id: 1,
    title: "Took the whole family and had a blast",
    rating: 7,
    reviewText:
      "Jason Momoa was absolutely fantastic in this movie. To me and my wife he was the highlight. He seriously deserves an Oscar for bringing a caricature to life and making us care about his character. The CGI was also fantastic: vivid, richly imagined, and engrossing. It was remarkable that a majority of the film occurs in the Minecraft world and yet it (and the real human characters in it) felt truly real. Truly outstanding work by the whole production team. There was also a lot of laugh-out-loud moments, and over the top silliness which was a ton of fun. On the way home all of us (me, my wife, and our three kids: 13,10, 8) were sharing our favorite moments and quips from the film. Our kids loved it, and from the engagement I heard of all the kids around us (some much younger than ours), everyone was having a good time. I'd say this is a fun family film anyone from 4 to adult (I'm 47) will enjoy. And thanks again to Jason Momoa for committing so hard to his character and Jack Black for bringing the music and enthusiasm. Jason Momoa was absolutely fantastic in this movie. To me and my wife he was the highlight. He seriously deserves an Oscar for bringing a caricature to life and making us care about his character. The CGI was also fantastic: vivid, richly imagined, and engrossing. It was remarkable that a majority of the film occurs in the Minecraft world and yet it (and the real human characters in it) felt truly real. Truly outstanding work by the whole production team. There was also a lot of laugh-out-loud moments, and over the top silliness which was a ton of fun. On the way home all of us (me, my wife, and our three kids: 13,10, 8) were sharing our favorite moments and quips from the film. Our kids loved it, and from the engagement I heard of all the kids around us (some much younger than ours), everyone was having a good time. I'd say this is a fun family film anyone from 4 to adult (I'm 47) will enjoy. And thanks again to Jason Momoa for committing so hard to his character and Jack Black for bringing the music and enthusiasm Jason Momoa was absolutely fantastic in this movie. To me and my wife he was the highlight. He seriously deserves an Oscar for bringing a caricature to life and making us care about his character. The CGI was also fantastic: vivid, richly imagined, and engrossing. It was remarkable that a majority of the film occurs in the Minecraft world and yet it (and the real human characters in it) felt truly real. Truly outstanding work by the whole production team. There was also a lot of laugh-out-loud moments, and over the top silliness which was a ton of fun. On the way home all of us (me, my wife, and our three kids: 13,10, 8) were sharing our favorite moments and quips from the film. Our kids loved it, and from the engagement I heard of all the kids around us (some much younger than ours), everyone was having a good time. I'd say this is a fun family film anyone from 4 to adult (I'm 47) will enjoy. And thanks again to Jason Momoa for committing so hard to his character and Jack Black for bringing the music and enthusiasm ",
    helpful: 198,
    comments: 110,
  },
  {
    id: 2,
    title: "A fun family film",
    rating: 8,
    reviewText: "A fun family film with a good story and good acting.",
    helpful: 198,
    comments: 110,
  },
];

const ShowReview = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const showId = params.id;

  const handleReviewClick = () => {
    router.push(`/show/${showId}/reviews`);
  };

  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <>
      <Card className="border-none shadow-none">
        <CardHeader className="flex px-0">
          <div className="flex flex-row justify-between gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl font-bold">User Reviews</CardTitle>
              <Link href={`/show/${showId}/reviews`} className="text-sm text-gray-500 hover:underline">
                View All
              </Link>
            </div>
            <div>
              <Button variant="ghost" className="text-blue-500 font-bold hover:text-blue-600" onClick={() => setIsDialogVisible(true)}>
                Write review
              </Button>
            </div>
          </div>
          <Separator />
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <ReviewContainer key={review.id} review={review} handleOnHeaderClick={handleReviewClick} className="max-w-3xl" />
            ))}
          </div>
        </CardContent>
      </Card>
      <CommonDialog
        className="max-w-2xl"
        title="Write a review"
        isVisible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        closeButtonText="Cancel"
        continueButtonText="Submit"
        onConfirm={() => setIsDialogVisible(false)}
        noButton={true}
      >
        <AddShowReview onCancel={() => setIsDialogVisible(false)} />
      </CommonDialog>
    </>
  );
};

export default ShowReview;
