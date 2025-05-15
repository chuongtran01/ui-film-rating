import React from "react";
import ShowIntroduction from "@/components/show/ShowIntroduction";
import ShowDetails from "@/components/show/ShowDetails";
import ShowReview from "@/components/show/ShowReview";
export default function page() {
  return (
    <div className="min-h-screen container mx-auto  pt-12">
      <ShowDetails />
    </div>
  );
}
