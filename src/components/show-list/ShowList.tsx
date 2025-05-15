"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ShowContainer, { Show } from "@/components/show-list/ShowContainer";
import ShowFilter from "@/components/show-list/ShowFIlter";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface ShowListProps {
  shows: Show[];
  title: string;
}

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "rating", label: "Rating" },
];

export default function ShowList({ shows, title }: ShowListProps) {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 flex flex-col gap-6">
      <h1 className="text-4xl font-bold mb-4 pt-6">{title}</h1>
      <div className="grid grid-cols-[1fr_4fr] gap-4">
        <div>
          <ShowFilter />
        </div>
        <div className="flex flex-col gap-2">
          <Card className="border-none shadow-none">
            <CardHeader>
              <CardDescription>27,999 results</CardDescription>
              <div className="flex justify-end">
                <Select>
                  <SelectTrigger className="w-fit">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-screen-2xl w-full">
              {shows.map((show) => (
                <ShowContainer key={show.id} show={show} />
              ))}
            </CardContent>
          </Card>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
