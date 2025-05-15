import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ReviewContainer, { Review } from "./ReviewContainer";
import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import AddShowReview from "@/components/show-review/AddShowReview";
import { Label } from "@/components/ui/label";

const sortOptions = [
  { label: "Most Helpful", value: "most-helpful" },
  { label: "Most Recent", value: "most-recent" },
];

const ratingOptions = [
  { label: "All", value: "all" },
  { label: "1 star", value: "1" },
  { label: "2 stars", value: "2" },
  { label: "3 stars", value: "3" },
  { label: "4 stars", value: "4" },
  { label: "5 stars", value: "5" },
  { label: "6 stars", value: "6" },
  { label: "7 stars", value: "7" },
  { label: "8 stars", value: "8" },
  { label: "9 stars", value: "9" },
  { label: "10 stars", value: "10" },
];

const ReviewListControl = () => {
  const [hideSpoilers, setHideSpoilers] = useState(false);
  const [sort, setSort] = useState("most-helpful");

  return (
    <Card className="px-0 border-none shadow-none">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Label>224 reviews</Label>
          <label className="flex items-center gap-2 text-black text-base cursor-pointer">
            <Checkbox id="hide-spoilers" checked={hideSpoilers} onCheckedChange={() => setHideSpoilers((v) => !v)} />
            <label htmlFor="hide-spoilers" className="text-black text-base cursor-pointer">
              Hide spoilers
            </label>
          </label>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4 justify-start md:justify-end flex-wrap">
          <div className="flex items-center gap-2">
            <Select>
              <SelectTrigger className="border border-gray-300 rounded px-2 py-1 text-base gap-2">
                <SelectValue placeholder="Show all" />
              </SelectTrigger>
              <SelectContent>
                {ratingOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <Select value={sort} onValueChange={(value) => setSort(value)}>
              <SelectTrigger className="border border-gray-300 rounded px-2 py-1 text-base gap-2">
                <SelectValue placeholder="Most Helpful" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="bg-blue-600 text-white font-semibold flex items-center gap-1 px-3 py-1 rounded hover:bg-blue-700">
                <Plus className="w-4 h-4" /> Review
              </Button>
            </SheetTrigger>
            <AddShowReview />
          </Sheet>
        </div>
      </div>
    </Card>
  );
};

interface ReviewListBodyProps {
  reviews: Review[];
}

const ReviewListBody = ({ reviews }: ReviewListBodyProps) => {
  return (
    <Card className="px-0 border-none shadow-none">
      <CardHeader className="px-0 flex flex-col gap-4">
        <ReviewListControl />
        <Separator />
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 justify-items-start gap-y-12 px-0">
        {reviews.map((review) => (
          <ReviewContainer key={review.id} review={review} handleOnHeaderClick={() => {}} />
        ))}
      </CardContent>
    </Card>
  );
};

export default ReviewListBody;
