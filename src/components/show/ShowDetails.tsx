import React from "react";
import ShowStreamingPlatform from "./ShowStreamingPlatform";
import ShowCredits from "./ShowCredits";
import ShowReview from "./ShowReview";
import ShowComment from "./ShowComment";
export default function ShowDetails() {
  return (
    <div className="bg-white p-12 space-y-12">
      <ShowStreamingPlatform />
      <ShowCredits />
      <ShowReview />
      <ShowComment />
    </div>
  );
}
