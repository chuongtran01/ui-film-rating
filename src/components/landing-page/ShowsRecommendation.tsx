import { Star } from "lucide-react";
import { Show } from "@/components/show-list/ShowContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import ReviewScoreContainer from "@/components/ReviewScoreContainer";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

interface ShowsRecommendationProps {
  title: string;
  viewAllHref?: string;
  shows: Show[];
}

const ShowsRecommendation = ({ title, shows, viewAllHref }: ShowsRecommendationProps) => {
  const router = useRouter();

  const handleShowClick = (showId: number) => {
    router.push(`/show/${showId}`);
  };

  return (
    <Card className="border-none shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          {viewAllHref && (
            <Link href={viewAllHref} className="text-sm text-gray-500 hover:underline">
              View All
            </Link>
          )}
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-7 gap-6 max-w-screen-2xl w-full">
          {shows.map((show) => (
            <Card key={show.id} className="bg-transparent border-none shadow-none flex flex-col items-center gap-4">
              <CardHeader className="p-0 w-full h-60">
                <img
                  src={show.poster}
                  alt={show.title}
                  className="w-full h-60 object-cover cursor-pointer hover:opacity-80 transition-all duration-300 rounded-xl"
                  onClick={() => handleShowClick(show.id)}
                />
              </CardHeader>
              <CardContent className="p-0 w-full">
                <div className="flex flex-col w-full gap-2">
                  <div className="font-semibold text-base w-full truncate cursor-pointer hover:underline" onClick={() => handleShowClick(show.id)}>
                    {show.title}
                  </div>
                  <ReviewScoreContainer score={show.rating} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ShowsRecommendation;
