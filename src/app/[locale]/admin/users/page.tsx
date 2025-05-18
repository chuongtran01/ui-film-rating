import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Users</h3>
        <p className="text-sm text-muted-foreground">Manage the users.</p>
      </div>
      <Separator />
      <div>Users</div>
    </div>
  );
};

export default page;
