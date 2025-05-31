import { Download, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface DataTableExportProps {
  isPending: boolean;
  disabled: boolean;
  className?: string;
  align?: "start" | "end";

  onExport: () => void;
  tooltip?: string;
}

const DataTableExport = ({ isPending, disabled, className, onExport, tooltip, ...props }: DataTableExportProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size={"icon"} className={cn("gap-1.5 [&>svg]:size-3.5 size-7", className)} disabled={disabled || isPending} onClick={onExport} {...props}>
            {isPending ? <Loader className="animate-spin" /> : <Download />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip ? tooltip : "Export"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DataTableExport;
