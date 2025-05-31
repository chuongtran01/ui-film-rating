import ProfileAccount from "@/components/profile/ProfileAccountForm";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("myProfile.myAccount.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("myProfile.myAccount.description")}</p>
      </div>
      <Separator />
      <ProfileAccount />
    </div>
  );
};

export default page;
