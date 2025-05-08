import ShowList from "@/components/show-list/ShowList";
import React from "react";

const shows = [
  {
    id: 1,
    title: "The Amateur",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 6.7,
    watchOptions: false,
  },
  {
    id: 2,
    title: "Warfare",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 7.8,
    watchOptions: false,
  },
  {
    id: 3,
    title: "Mickey 17",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 6.8,
    watchOptions: false,
  },
  {
    id: 4,
    title: "Sonic the Hedgehog 3",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 6.9,
    watchOptions: true,
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 9.0,
    watchOptions: false,
  },
  {
    id: 6,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 9.0,
    watchOptions: false,
  },
  {
    id: 7,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 9.0,
    watchOptions: false,
  },
  {
    id: 8,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 9.0,
    watchOptions: false,
  },
];

export default function page() {
  return (
    <div className="bg-black min-h-screen container mx-auto w-full">
      <div className="max-w-screen-2xl">
        <ShowList shows={shows} title="Top Movies" />
      </div>
    </div>
  );
}
