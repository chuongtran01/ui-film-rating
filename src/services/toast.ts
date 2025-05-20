import { toast } from "@/hooks/use-toast";

const toastService = {
  success: (title: string, message?: string, duration: number = 3000) => {
    toast({
      title: title,
      description: message,
      duration: duration,
      variant: "default",
    });
  },

  error: (title: string, message?: string) => {
    toast({
      title: title,
      description: message,
      variant: "destructive",
    });
  },

  info: (title: string, message?: string) => {
    toast({
      title: title,
      description: message,
    });
  },

  warning: (title: string, message?: string) => {
    toast({
      title: title,
      description: message,
    });
  },
};

export default toastService;
