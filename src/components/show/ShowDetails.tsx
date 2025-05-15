import React from "react";
import ShowStreamingPlatform from "./ShowStreamingPlatform";
import ShowCredits from "./ShowCredits";
import ShowReview from "./ShowReview";
import ShowComment from "./ShowComment";
import ShowIntroduction from "./ShowIntroduction";
export default function ShowDetails() {
  return (
    <div className="flex flex-col gap-8">
      <ShowIntroduction
        posterUrl="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg"
        title="Sinners"
        year={2025}
        rating={81}
        duration="2h 17m"
        ageRating="R"
        genres={["Period Drama", "Supernatural Horror", "Vampire Horror", "Action", "Drama", "Horror", "Thriller"]}
        plot="Trying to leave their troubled lives behind, twin brothers return to their hometown to start again, only to discover that an even greater evil is waiting to welcome them back."
        director={{ name: "Ryan Coogler", url: "#" }}
        writer={{ name: "Ryan Coogler", url: "#" }}
        stars={[
          { name: "Miles Caton", url: "#" },
          { name: "Saul Williams", url: "#" },
          { name: "Andrene Ward-Hammond", url: "#" },
        ]}
      />
      <ShowStreamingPlatform />
      <ShowCredits />
      <ShowReview />
      <ShowComment />
    </div>
  );
}
