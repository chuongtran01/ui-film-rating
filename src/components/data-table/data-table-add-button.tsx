import { Download, Loader, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface DataTableAddButtonProps {
  title?: string;

  size?: "icon" | "default";
  className?: string;
  align?: "start" | "end";

  onClick: () => void;
}

const DataTableAddButton = ({ title, size = "default", className, onClick, ...props }: DataTableAddButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size={size} className={cn("gap-1.5 [&>svg]:size-3.5 size-7 w-fit", className)} onClick={onClick} {...props}>
            {title ? title : "Add"}
            <Plus />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DataTableAddButton;
