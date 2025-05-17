import ProfilePasswordForm from "@/components/profile/ProfilePasswordForm";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Password</h3>
        <p className="text-sm text-muted-foreground">Update your password.</p>
      </div>
      <Separator />
      <ProfilePasswordForm />
    </div>
  );
};

export default page;
