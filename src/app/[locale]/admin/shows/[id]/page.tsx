import { UpdateShow } from "@/components/admin/shows/table/UpdateShow";
import { Separator } from "@/components/ui/separator";
import showService from "@/services/show";
import { Show } from "@/types/show";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

const page = () => {
  const { id } = useParams();
  const t = useTranslations();

  const {
    data: show,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["show", id],
    queryFn: () => showService.getShowById(id as string),
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error loading show</div>;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.shows.updateShow.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("admin.shows.updateShow.description")}</p>
      </div>
      <Separator />
      <UpdateShow show={show as Show} />
    </div>
  );
};

export default page;
