import ShowList from "@/components/show-list/ShowList";
import React from "react";

const shows = [
  {
    id: 1,
    title: "The Amateur",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 67,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 2,
    title: "Warfare",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 78,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 3,
    title: "Mickey 17",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 68,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 4,
    title: "Sonic the Hedgehog 3",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 69,
    watchOptions: true,
    releaseDate: "2023-01-01",
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 6,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 80,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 7,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 40,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
  {
    id: 8,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 10,
    watchOptions: false,
    releaseDate: "2023-01-01",
  },
];

export default function page() {
  return (
    <div className="min-h-screen container mx-auto w-full">
      <div className="max-w-screen-2xl">
        <ShowList shows={shows} title="Top Series" />
      </div>
    </div>
  );
}
