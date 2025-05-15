import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const genres = [
  { id: "action", name: "Action" },
  { id: "adventure", name: "Adventure" },
  { id: "comedy", name: "Comedy" },
  { id: "drama", name: "Drama" },
  { id: "fantasy", name: "Fantasy" },
  { id: "horror", name: "Horror" },
  { id: "mystery", name: "Mystery" },
  { id: "romance", name: "Romance" },
  { id: "sci-fi", name: "Sci-Fi" },
  { id: "thriller", name: "Thriller" },
  { id: "western", name: "Western" },
];

const countries = [
  { id: "cn", name: "China" },
  { id: "us", name: "United States" },
  { id: "in", name: "India" },
  { id: "jp", name: "Japan" },
  { id: "kr", name: "Korea" },
  { id: "ru", name: "Russia" },
  { id: "gb", name: "UK" },
  { id: "fr", name: "France" },
  { id: "de", name: "Germany" },
];

const streamingServices = [
  { id: "netflix", name: "Netflix" },
  { id: "amazon", name: "Amazon" },
  { id: "hulu", name: "Hulu" },
  { id: "disney", name: "Disney" },
  { id: "apple", name: "Apple" },
  { id: "peacock", name: "Peacock" },
  { id: "hbo", name: "HBO" },
  { id: "showtime", name: "Showtime" },
  { id: "starz", name: "Starz" },
];

const statuses = [
  { id: "ongoing", name: "Ongoing" },
  { id: "completed", name: "Completed" },
  { id: "upcoming", name: "Upcoming" },
];

const ShowFilter = () => {
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [showAllCountries, setShowAllCountries] = useState(false);
  const [showAllStreamingServices, setShowAllStreamingServices] = useState(false);
  return (
    <Card className="w-full bg-white border-none shadow-none">
      <CardHeader className="flex flex-col gap-2">
        <CardTitle>Filters</CardTitle>
        <Separator />
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-2">
          {/* Release Year */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Release Year</Label>
            <div className="flex gap-2 justify-between">
              <Input type="number" placeholder="From" />
              <Input type="number" placeholder="To" />
            </div>
          </div>
          <Separator />

          {/* Rating */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Rating</Label>
            <div className="flex gap-2 justify-between">
              <Input type="number" placeholder="From" />
              <Input type="number" placeholder="To" />
            </div>
          </div>
          <Separator />

          {/* Genre */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Genre</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllGenres ? genres : genres.slice(0, 6)).map((genre) => (
                <div key={genre.id} className="flex gap-2">
                  <Checkbox id={genre.id} className="border-black" />
                  <Label htmlFor={genre.id} className="text-black">
                    {genre.name}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllGenres((prev) => !prev)}>
                {showAllGenres ? <Minus /> : <Plus />}
                {showAllGenres ? "Show less" : "Show all"}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Country */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Country</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllCountries ? countries : countries.slice(0, 8)).map((country) => (
                <div key={country.id} className="flex gap-2">
                  <Checkbox id={country.id} className="border-black" />
                  <Label htmlFor={country.id} className="text-black">
                    {country.name}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllCountries((prev) => !prev)}>
                {showAllCountries ? <Minus /> : <Plus />}
                {showAllCountries ? "Show less" : "Show all"}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Streaming Service */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Streaming Services</Label>
            <div className="grid grid-cols-2 gap-2">
              {(showAllStreamingServices ? streamingServices : streamingServices.slice(0, 4)).map((service) => (
                <div key={service.id} className="flex gap-2">
                  <Checkbox id={service.id} className="border-black" />
                  <Label htmlFor={service.id} className="text-black">
                    {service.name}
                  </Label>
                </div>
              ))}
            </div>
            <div className="flex justify-start">
              <Button variant="link" className="p-0 text-sm text-gray-500" onClick={() => setShowAllStreamingServices((prev) => !prev)}>
                {showAllStreamingServices ? <Minus /> : <Plus />}
                {showAllStreamingServices ? "Show less" : "Show all"}
              </Button>
            </div>
          </div>
          <Separator />

          {/* Status */}
          <div className="flex flex-col gap-4 py-4">
            <Label className="font-semibold">Status</Label>
            <div className="grid grid-cols-2 gap-2">
              {statuses.map((status) => (
                <div key={status.id} className="flex gap-2">
                  <Checkbox id={status.id} className="border-black" />
                  <Label htmlFor={status.id} className="text-black">
                    {status.name}
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
          <Button variant="outline">Reset</Button>
          <Button>Search</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ShowFilter;
