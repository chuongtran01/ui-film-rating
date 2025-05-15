import { ChevronLeft } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
const ReviewListHeader = () => {
  const router = useRouter();

  return (
    <Card className="flex flex-col gap-6 border-none shadow-none">
      <CardHeader className="p-0">
        <div className="flex items-center gap-1 hover:opacity-80 cursor-pointer" onClick={() => router.back()}>
          <ChevronLeft />
          <h2 className="text-lg">Back</h2>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 p-0">
        <div className="flex items-center gap-4">
          <img src="https://m.media-amazon.com/images/M/MV5BMDM1ODI5NTYtYzk1ZC00ZmQ0LTgwOTgtNDcxNGU1Nzk1NjZhXkEyXkFqcGc@._V1_.jpg" alt="Warfare" className="w-20 h-28 rounded-lg object-cover shadow" />
          <div>
            <div className="text-2xl font-semibold">Warfare</div>
            <div className="text-4xl font-bold mt-2">User reviews</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewListHeader;
