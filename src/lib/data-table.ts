import type { ExtendedColumnFilter, FilterOperator, FilterVariant } from "@/types/data-table";
import type { Column } from "@tanstack/react-table";

import { dataTableConfig } from "@/config/data-table";

export function getCommonPinningStyles<TData>({ column, withBorder = false }: { column: Column<TData>; withBorder?: boolean }): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn = isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn = isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: withBorder ? (isLastLeftPinnedColumn ? "-4px 0 4px -4px hsl(var(--border)) inset" : isFirstRightPinnedColumn ? "4px 0 4px -4px hsl(var(--border)) inset" : undefined) : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    opacity: isPinned ? 0.97 : 1,
    position: isPinned ? "sticky" : "relative",
    background: isPinned ? "hsl(var(--background))" : "hsl(var(--background))",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}

export function getFilterOperators(filterVariant: FilterVariant) {
  const operatorMap: Record<FilterVariant, { label: string; value: FilterOperator }[]> = {
    text: dataTableConfig.textOperators,
    number: dataTableConfig.numericOperators,
    range: dataTableConfig.numericOperators,
    date: dataTableConfig.dateOperators,
    dateRange: dataTableConfig.dateOperators,
    boolean: dataTableConfig.booleanOperators,
    select: dataTableConfig.selectOperators,
    multiSelect: dataTableConfig.multiSelectOperators,
    popoverText: dataTableConfig.textOperators,
  };

  return operatorMap[filterVariant] ?? dataTableConfig.textOperators;
}

export function getDefaultFilterOperator(filterVariant: FilterVariant) {
  const operators = getFilterOperators(filterVariant);

  return operators[0]?.value ?? (filterVariant === "text" ? "iLike" : "eq");
}

export function getValidFilters<TData>(filters: ExtendedColumnFilter<TData>[]): ExtendedColumnFilter<TData>[] {
  return filters.filter(
    (filter) =>
      filter.operator === "isEmpty" ||
      filter.operator === "isNotEmpty" ||
      (Array.isArray(filter.value) ? filter.value.length > 0 : filter.value !== "" && filter.value !== null && filter.value !== undefined)
  );
}

export function getValidSearchParams<T extends Record<string, any>>(search: T): Partial<T> {
  return Object.fromEntries(
    Object.entries(search)
      .filter(([key, value]) => {
        if (key === "page" && typeof value === "number") {
          return value >= 0;
        }
        if (Array.isArray(value)) return value.length > 0;
        if (typeof value === "string") return value !== "";
        return value !== undefined && value !== null;
      })
      .map(([key, value]) => {
        if (key === "page" && typeof value === "number") {
          if (value === 0) return [key, 0];
          return [key, value - 1];
        }
        return [key, value];
      })
  ) as Partial<T>;
}
