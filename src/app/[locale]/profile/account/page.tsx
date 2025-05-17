import ProfileAccount from "@/components/profile/ProfileAccountForm";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Account</h3>
        <p className="text-sm text-muted-foreground">Update your account settings.</p>
      </div>
      <Separator />
      <ProfileAccount />
    </div>
  );
};

export default page;
