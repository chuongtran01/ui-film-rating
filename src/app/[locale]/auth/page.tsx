"use client";

import LoginForm from "@/components/authentication/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SignupForm from "@/components/authentication/SignupForm";
import { getParam, setParam } from "@/lib/urlParams";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = getParam(searchParams, "tab") || "signin";

  const onSubmit = () => {
    router.push("/");
  };

  const onSignUpSubmit = () => {
    setParam(router, searchParams, "tab", "signin");
  };

  const handleTabChange = useCallback(
    (value: string) => {
      setParam(router, searchParams, "tab", value);
    },
    [router, searchParams]
  );

  const tabs = [
    {
      label: "Sign in",
      value: "signin",
      component: <LoginForm onSubmit={onSubmit} className="border-none" />,
    },
    {
      label: "Sign up",
      value: "register",
      component: <SignupForm onSubmit={onSignUpSubmit} className="border-none" />,
    },
  ];

  return (
    <div className="grid min-h-svh lg:grid-cols-2 bg-white">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Tabs value={tab} onValueChange={handleTabChange} className="w-[400px]">
              <TabsList className="grid w-full grid-cols-2">
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value} className="data-[state=active]:bg-white data-[state=active]:text-black">
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {tabs.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                  {tab.component}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img src="https://ui.shadcn.com/placeholder.svg" alt="Image" className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
    </div>
  );
};

export default Login;
