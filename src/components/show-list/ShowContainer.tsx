import { Info, Play, PlayIcon, PlusIcon, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReviewScoreContainer from "@/components/ReviewScoreContainer";

export interface Show {
  id: number;
  title: string;
  poster: string;
  rating: number;
  watchOptions?: boolean;
  releaseDate: string;
}

interface ShowContainerProps {
  show: Show;
}

const ShowContainer = ({ show }: ShowContainerProps) => {
  const router = useRouter();

  return (
    <Card className="flex items-center p-3 rounded-xl bg-white">
      <div className="w-20 h-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 mr-4">
        <img src={show.poster} alt={show.title} className="w-full h-full object-cover cursor-pointer hover:opacity-80 transition" onClick={() => router.push(`/show/${show.id}`)} />
      </div>
      <div className="flex flex-col items-start h-full justify-between min-w-0 w-full">
        <div className="font-semibold truncate w-full block">{show.title}</div>
        <div className="flex gap-2">
          <Button className="bg-white text-black font-semibold border border-gray-300 hover:bg-gray-100">Trailer</Button>
          <Button className="bg-white text-black border border-gray-300 hover:bg-gray-100">
            <PlusIcon />
          </Button>
        </div>
        <ReviewScoreContainer score={show.rating} />
        {/* <div className="text-sm text-gray-500 truncate">{show.description}</div> */}
      </div>
    </Card>
  );
};

export default ShowContainer;
