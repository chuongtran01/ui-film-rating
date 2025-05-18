import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Shows</h3>
        <p className="text-sm text-muted-foreground">Manage the movies, series.</p>
      </div>
      <Separator />
      <div>Shows</div>
    </div>
  );
};

export default page;
