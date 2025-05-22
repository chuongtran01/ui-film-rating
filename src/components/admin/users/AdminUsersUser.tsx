"use client";

import { z } from "zod";
import { taskSchema } from "@/components/table/data/schema";
import { DataTable } from "@/components/table/DataTable";
import { columns } from "@/components/table/Columns";
import tasks from "@/components/table/data/tasks.json";
// import { getEstimatedHoursRange, getTaskPriorityCounts, getTaskStatusCounts, getTasks } from "./_lib/queries";
import { TasksTable } from "./_components/tasks-table";
import { searchParamsCache } from "./_lib/validations";
import { getValidFilters } from "@/lib/data-table";

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface IndexPageProps {
  searchParams: Promise<SearchParams>;
}

const AdminUsersUser = (props: IndexPageProps) => {
  const searchParams = props.searchParams;
  const search = searchParamsCache.parse(searchParams);

  const validFilters = {};

  const getTaskStatusCounts = () => {};
  const getEstimatedHoursRange = () => {};
  const getTasks = ({}) => {
    data: [];
  };
  const getTaskPriorityCounts = () => {};

  const promises = Promise.all([
    getTasks({
      ...search,
      filters: validFilters,
    }),
    getTaskStatusCounts(),
    getTaskPriorityCounts(),
    getEstimatedHoursRange(),
  ]);

  return <TasksTable promises={promises} />;
};

export default AdminUsersUser;
