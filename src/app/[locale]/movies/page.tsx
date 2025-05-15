import ShowList from "@/components/show-list/ShowList";
import React from "react";

const shows = [
  {
    id: 1,
    title: "The Amateur",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 67,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 2,
    title: "Warfare",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 78,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 3,
    title: "Mickey 17",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 68,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 4,
    title: "Sonic the Hedgehog 3",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 69,
    releaseDate: "2023-01-01",
    watchOptions: true,
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 6,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 7,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 8,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 9,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 10,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 11,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 12,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 13,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 14,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 15,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 16,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 17,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 18,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 90,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
];

export default function page() {
  return (
    <div className="min-h-screen container mx-auto w-full">
      <div className="max-w-screen-2xl">
        <ShowList shows={shows} title="Top Movies" />
      </div>
    </div>
  );
}
