"use client";

import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { getParam, setParam } from "@/lib/urlParams";

const tabs = [
  {
    label: "All",
    value: "all",
    component: <div>All</div>,
  },
  {
    label: "Watching",
    value: "watching",
    component: <div>Watching</div>,
  },
  {
    label: "Completed",
    value: "completed",
    component: <div>Completed</div>,
  },
  {
    label: "Dropped",
    value: "dropped",
    component: <div>Dropped</div>,
  },
  {
    label: "On Hold",
    value: "on-hold",
    component: <div>On Hold</div>,
  },
  {
    label: "Plan to Watch",
    value: "plan-to-watch",
    component: <div>Plan to Watch</div>,
  },
];

const page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = getParam(searchParams, "tab") || "all";

  const handleTabChange = useCallback(
    (value: string) => {
      setParam(router, searchParams, "tab", value);
    },
    [router, searchParams]
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Watchlist</h3>
        <p className="text-sm text-muted-foreground">View what you have in your watchlist.</p>
      </div>
      <Separator />
      <Tabs value={tab} onValueChange={handleTabChange} className="w-fit">
        <TabsList className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={tab}>{tabs.find((t) => t.value === tab)?.component}</TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
