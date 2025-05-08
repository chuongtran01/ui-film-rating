import React from "react";
import ShowIntroduction from "@/components/show/ShowIntroduction";
import ShowDetails from "@/components/show/ShowDetails";
import ShowReview from "@/components/show/ShowReview";
export default function page() {
  return (
    <div className="min-h-screen container mx-auto pt-12">
      <ShowIntroduction
        posterUrl="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg"
        title="Sinners"
        year={2025}
        rating={8.1}
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
      <ShowDetails />
    </div>
  );
}
