import { ShowsTable } from "@/components/admin/shows/table/ShowsTable";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from "next-intl";

const page = () => {
  const t = useTranslations();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.shows.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("admin.shows.description")}</p>
      </div>
      <Separator />
      <ShowsTable />
    </div>
  );
};

export default page;
