"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useTranslations } from "next-intl";
import Trending from "@/components/trendings/Trending";
export default function Home() {
  const count = useSelector((state: RootState) => state.principal);
  const dispatch = useDispatch();

  const t = useTranslations();

  return (
    <div className="min-h-screen">
      {/* <h1>{t("HomePage.title")}</h1> */}
      <Trending />
    </div>
  );
}
