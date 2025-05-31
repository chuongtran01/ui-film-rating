import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

const genres = [
  { id: "action" },
  { id: "adventure" },
  { id: "comedy" },
  { id: "drama" },
  { id: "fantasy" },
  { id: "horror" },
  { id: "mystery" },
  { id: "romance" },
  { id: "sci-fi" },
  { id: "thriller" },
  { id: "western" },
];

const countries = [{ id: "cn" }, { id: "us" }, { id: "in" }, { id: "jp" }, { id: "kr" }, { id: "ru" }, { id: "gb" }, { id: "fr" }, { id: "de" }];

const streamingServices = [{ id: "netflix" }, { id: "amazon" }, { id: "hulu" }, { id: "disney" }, { id: "apple" }, { id: "peacock" }, { id: "hbo" }, { id: "showtime" }, { id: "starz" }];

const statuses = [{ id: "ongoing" }, { id: "completed" }, { id: "upcoming" }];

const ShowFilter = () => {
  const t = useTranslations();

  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [showAllStreamingServices, setShowAllStreamingServices] = useState(false);

  return (
    <Card className="w-full bg-white border-none shadow-none">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>{t("showFilter.title")}</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {/* Release Year */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.releaseYear.title")}</Label>
            <div className="flex gap-2 justify-between">
              <Input type="number" placeholder={t("showFilter.categories.releaseYear.input.fromPlaceholder")} />
              <Input type="number" placeholder={t("showFilter.categories.releaseYear.input.toPlaceholder")} />
            </div>
          </div>
          <Separator />

          {/* Rating */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.rating.title")}</Label>
            <div className="flex gap-2 justify-between">
              <Input type="number" placeholder={t("showFilter.categories.rating.input.fromPlaceholder")} />
              <Input type="number" placeholder={t("showFilter.categories.rating.input.toPlaceholder")} />
            </div>
          </div>
          <Separator />

          {/* Genre */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.genres.title")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllGenres ? genres : genres.slice(0, 6)).map((genre) => (
                <div key={genre.id} className="flex gap-2">
                  <Checkbox id={genre.id} className="border-black" />
                  <Label htmlFor={genre.id} className="text-black">
                    {t(`showFilter.categories.genres.options.${genre.id}`)}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllGenres((prev) => !prev)}>
                {showAllGenres ? <Minus /> : <Plus />}
                {showAllGenres ? t("showFilter.categories.genres.showLess") : t("showFilter.categories.genres.showAll")}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Country */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.countries.title")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllCountries ? countries : countries.slice(0, 8)).map((country) => (
                <div key={country.id} className="flex gap-2">
                  <Checkbox id={country.id} className="border-black" />
                  <Label htmlFor={country.id} className="text-black">
                    {t(`showFilter.categories.countries.options.${country.id}`)}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllCountries((prev) => !prev)}>
                {showAllCountries ? <Minus /> : <Plus />}
                {showAllCountries ? t("showFilter.categories.countries.showLess") : t("showFilter.categories.countries.showAll")}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Streaming Service */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.streamingPlatforms.title")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllStreamingServices ? streamingServices : streamingServices.slice(0, 4)).map((service) => (
                <div key={service.id} className="flex gap-2">
                  <Checkbox id={service.id} className="border-black" />
                  <Label htmlFor={service.id} className="text-black">
                    {t(`showFilter.categories.streamingPlatforms.options.${service.id}`)}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllStreamingServices((prev) => !prev)}>
                {showAllStreamingServices ? <Minus /> : <Plus />}
                {showAllStreamingServices ? t("showFilter.categories.streamingPlatforms.showLess") : t("showFilter.categories.streamingPlatforms.showAll")}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Status */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">{t("showFilter.categories.statuses.title")}</Label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <div key={status.id} className="flex gap-2">
                  <Checkbox id={status.id} className="border-black" />
                  <Label htmlFor={status.id} className="text-black">
                    {t(`showFilter.categories.statuses.options.${status.id}`)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4">
        <Separator />
        <div className="flex w-full justify-between">
          <Button variant="outline">{t("showFilter.categories.buttons.reset")}</Button>
          <Button>{t("showFilter.categories.buttons.search")}</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShowFilter;
