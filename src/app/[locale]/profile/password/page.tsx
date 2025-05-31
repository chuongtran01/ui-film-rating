import ProfilePasswordForm from "@/components/profile/ProfilePasswordForm";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("myProfile.password.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("myProfile.password.description")}</p>
      </div>
      <Separator />
      <ProfilePasswordForm />
    </div>
  );
};

export default page;
