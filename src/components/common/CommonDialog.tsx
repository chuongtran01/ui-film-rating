import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
interface CommonDialogProps {
  title: string;
  subTitle?: string;
  isVisible: boolean;
  onClose: () => void;
  closeButtonText: string;
  onConfirm: () => void;
  continueButtonText: string;
  children?: React.ReactNode;
  noButton?: boolean;
  noCloseButton?: boolean;
  noContinueButton?: boolean;
  className?: string;
}

const CommonDialog = ({
  title,
  subTitle,
  isVisible,
  onClose,
  closeButtonText = "Cancel",
  onConfirm,
  continueButtonText = "Continue",
  children,
  noButton = false,
  noCloseButton = false,
  noContinueButton = false,
  className,
}: CommonDialogProps) => {
  return (
    <Dialog open={isVisible} onOpenChange={onClose}>
      <DialogContent className={cn("outline-none", className)}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          {!subTitle && <DialogDescription>{subTitle}</DialogDescription>}
        </DialogHeader>
        <div className="overflow-hidden rounded-t-none bg-transparent">{children}</div>
        <DialogFooter className="flex items-center sm:justify-end">
          {!noButton && (
            <>
              {!noCloseButton && (
                <Button variant="secondary" className="w-full text-md" onClick={onClose}>
                  {closeButtonText}
                </Button>
              )}
              {!noContinueButton && (
                <Button className="w-full text-md" onClick={onConfirm}>
                  {continueButtonText}
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommonDialog;
