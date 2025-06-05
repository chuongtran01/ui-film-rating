"use client";

import { CountriesTable } from "@/components/admin/filters/countries/CountriesTable";
import { GenresTable } from "@/components/admin/filters/genres/GenresTable";
import { LanguagesTable } from "@/components/admin/filters/languages/LanguagesTable";
import { ShowStatusesTable } from "@/components/admin/filters/show-statuses/ShowStatusesTable";
import { ShowTypesTable } from "@/components/admin/filters/show-types/ShowTypesTable";
import { StreamingPlatformsTable } from "@/components/admin/filters/streaming-platform/StreamingPlatformsTable";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import { setParam } from "@/lib/urlParams";
import { getParam } from "@/lib/urlParams";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const tabs = [
  {
    value: "genres",
    component: <GenresTable />,
  },
  {
    value: "languages",
    component: <LanguagesTable />,
  },
  {
    value: "countries",
    component: <CountriesTable />,
  },
  {
    value: "streaming-platforms",
    component: <StreamingPlatformsTable />,
  },
  {
    value: "show-statuses",
    component: <ShowStatusesTable />,
  },
  {
    value: "show-types",
    component: <ShowTypesTable />,
  },
];

const page = () => {
  const t = useTranslations();

  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = getParam(searchParams, "tab") || "genres";

  const handleTabChange = useCallback(
    (value: string) => {
      setParam(router, searchParams, "tab", value);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">{t("admin.filters.title")}</h3>
        <p className="text-sm text-muted-foreground">{t("admin.filters.description")}</p>
      </div>
      <Separator />
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="flex flex-wrap gap-2 w-fit">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {t(`admin.filters.tabs.${tab.value}.title`).toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent className="w-full" value={tab}>
          {tabs.find((t) => t.value === tab)?.component}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
