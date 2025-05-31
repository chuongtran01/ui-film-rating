import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import React, { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

interface DataTablePopoverTextProps<TData> {
  title: string;
  column: Column<TData>;
}

const DataTablePopoverText = <TData,>({ title, column }: DataTablePopoverTextProps<TData>) => {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);

  const columnMeta = column.columnDef.meta;
  if (!columnMeta) return null;

  const filterValue = column.getFilterValue() as string;
  const hasFilterValue = useMemo(() => !!filterValue, [filterValue]);

  React.useEffect(() => {
    if (!hasFilterValue) {
      setInputValue("");
      setIsDisabled(false);
    }
  }, [hasFilterValue]);

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
      setInputValue("");
      setIsDisabled(false);
    },
    [column]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      column.setFilterValue(inputValue);
      setIsDisabled(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          <Search />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-2" align="start">
        <div className="flex flex-col gap-2">
          <Input
            placeholder={columnMeta.placeholder ?? columnMeta.label}
            value={hasFilterValue ? filterValue : inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            className="h-8 w-full"
          />
          {hasFilterValue && (
            <div className="flex items-center gap-2 rounded-md border px-2 py-1">
              <span className="flex-1 truncate text-sm">{filterValue}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-transparent" onClick={onReset}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DataTablePopoverText;
