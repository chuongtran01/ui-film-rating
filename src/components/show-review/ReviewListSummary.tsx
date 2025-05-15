import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReviewScoreContainer from "@/components/ReviewScoreContainer";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const ReviewListSummary = () => {
  return (
    <Card className="flex flex-row w-fit">
      <CardHeader>
        <ReviewScoreContainer score={85} className="w-16 h-16 text-3xl" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 items-center justify-center py-0">
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 items-center justify-center">
          <Label>Positive</Label>
          <Progress value={60} className="w-[12rem] bg-gray-200" indicatorColor="!bg-green-400" />
          <span className="flex flex-row gap-1">
            <Label>695</Label>
            <Label className="font-semibold">(60%)</Label>
          </span>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 items-center justify-center">
          <Label>Mixed</Label>
          <Progress value={20} className="w-[12rem] bg-gray-200" indicatorColor="!bg-yellow-400" />
          <span className="flex flex-row gap-1">
            <Label>15</Label>
            <Label className="font-semibold">(20%)</Label>
          </span>
        </div>
        <div className="grid grid-cols-[1fr_2fr_1fr] gap-2 items-center justify-center">
          <Label>Negative</Label>
          <Progress value={20} className="w-[12rem] bg-gray-200" indicatorColor="!bg-red-400" />
          <span className="flex flex-row gap-1">
            <Label>15</Label>
            <Label className="font-semibold">(20%)</Label>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewListSummary;
