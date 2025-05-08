"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "@/i18n/routing";
import { Book, Sunset, Trees, Zap } from "lucide-react";
import { useDispatch } from "react-redux";
import { persistor } from "@/redux/store";
import { resetPrincipalAction } from "@/redux/features/principal/principalSlice";
import authService from "@/services/auth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import NavbarAvatar from "@/components/navbar/NavbarAvatar";
import LocaleSwitcher from "@/components/navbar/LocaleSwitcher";

const menuItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Movies",
    href: "/movies",
  },
  {
    title: "TV Shows",
    href: "/tv-shows",
  },
  {
    title: "Community",
    href: "/community",
  },
];
export default function UserNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    await authService.logout();
    dispatch(resetPrincipalAction());
    await persistor.purge();
    router.push("/login");
  };

  return (
    <div className="flex justify-center bg-gray-900 text-primary-foreground">
      <div className="flex h-16 items-center px-4 container">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-2xl font-semibold bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-500 bg-clip-text text-transparent">Flick</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className="select-none">
                      <Button variant="ghost" className="hover:bg-gray-800 hover:text-white font-semibold">
                        {item.title}
                      </Button>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <Input
              type="search"
              placeholder="Search..."
              className="md:w-[100px] lg:w-[300px] bg-transparent border-gray-700 text-primary-foreground placeholder:text-gray-400 focus:border-gray-600 [&::-webkit-search-cancel-button]:filter [&::-webkit-search-cancel-button]:invert [&::-webkit-search-cancel-button]:brightness-0"
            />
          </div>
          <LocaleSwitcher />
          <NavbarAvatar handleLogout={handleLogout} handleLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
}
