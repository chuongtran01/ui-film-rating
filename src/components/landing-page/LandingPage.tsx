import HeroCarousel from "@/components/landing-page/HeroCarousel";
import Subscription from "@/components/landing-page/Subscription";
import ShowsRecommendation from "@/components/landing-page/ShowsRecommendation";

const shows = [
  {
    id: 1,
    title: "The Amateur",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 60,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 2,
    title: "Warfare",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 50,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 3,
    title: "Mickey 17",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 50,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 4,
    title: "Sonic the Hedgehog 3",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 45,
    releaseDate: "2023-01-01",
    watchOptions: true,
  },
  {
    id: 5,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 35,
    releaseDate: "2023-01-01",
    watchOptions: false,
  },
  {
    id: 6,
    title: "The Dark Knight",
    poster: "https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg",
    rating: 35,
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
];

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-4">
      <HeroCarousel />
      <div className="flex flex-col gap-6 container mx-auto">
        <ShowsRecommendation title="New Releases" shows={shows} viewAllHref="/movies" />
        <ShowsRecommendation title="Trendings" shows={shows} viewAllHref="/movies" />
        <ShowsRecommendation title="Upcoming Releases" shows={shows} viewAllHref="/movies" />
        <Subscription />
      </div>
    </div>
  );
};

export default LandingPage;
