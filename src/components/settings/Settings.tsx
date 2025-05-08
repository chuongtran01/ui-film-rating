"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";
import SettingsProfile from "@/components/settings/SettingsProfile";
import { Separator } from "@/components/ui/separator";

const tabs = ["Profile", "General Settings", "Security & Privacy", "Notifications", "Connected Apps", "Subscriptions", "Blocking"];

export default function Settings() {
  return (
    <Card className="bg-white p-6 container mx-auto rounded-none">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Settings</CardTitle>
        <CardDescription className="text-sm"></CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs defaultValue="Profile" className="w-full">
          <TabsList className="bg-white">
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab} className="text-sm p-0 mr-4 font-semibold data-[state=active]:bg-transparent  data-[state=active]:text-black data-[state=active]:shadow-none">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
          <Separator className="mb-4" />
          <TabsContent value="Profile" className="mt-8">
            <SettingsProfile />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
