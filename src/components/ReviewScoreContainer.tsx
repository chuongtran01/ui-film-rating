import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface ReviewScoreContainerProps {
  score: number;
  className?: string;
}

const ReviewScoreContainer = ({ score, className }: ReviewScoreContainerProps) => {
  const getScoreColor = (score: number) => {
    if (score < 40) {
      return "bg-red-400 text-white";
    } else if (score >= 40 && score <= 70) {
      return "bg-yellow-400 text-black";
    } else {
      return "bg-green-400 text-black";
    }
  };

  return <Card className={cn("flex flex-row items-center justify-center gap-2 px-2 py-1 rounded text-sm font-bold w-fit shadow-none border-none", getScoreColor(score), className)}>{score}</Card>;
};

export default ReviewScoreContainer;
