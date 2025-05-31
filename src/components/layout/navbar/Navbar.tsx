"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "@/i18n/routing";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store";
import { resetPrincipalAction } from "@/redux/features/principal/principalSlice";
import authService from "@/services/auth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import NavbarAvatar from "@/components/layout/navbar/NavbarAvatar";
import { UserRole } from "@/enums/UserRole";
import { useTranslations } from "next-intl";

export default function UserNavbar() {
  const t = useTranslations();

  const dispatch = useDispatch();
  const router = useRouter();
  const principalState = useSelector((state: RootState) => state.principal);
  const handleLogin = () => {
    router.push("/auth");
  };

  const handleLogout = async () => {
    dispatch(resetPrincipalAction());
    await authService.logout();
    await persistor.purge();
    router.push("/auth");
  };

  const menuItems = [
    {
      title: t("navbar.home"),
      href: "/",
    },
    {
      title: t("navbar.movies"),
      href: "/movies",
    },
    {
      title: t("navbar.series"),
      href: "/series",
    },
    {
      title: t("navbar.admin"),
      href: "/admin",
      isVisible: principalState.role === UserRole.ROLE_ADMIN,
    },
  ];

  return (
    <div className="flex justify-center bg-navbar-background text-navbar-foreground">
      <div className="flex h-16 items-center px-4 container">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Link href="/">
              <span className="text-2xl font-semibold text-primary">{t("navbar.logo")}</span>
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.isVisible !== false && (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink className="select-none">
                        <Button variant="ghost" className="font-semibold">
                          {item.title}
                        </Button>
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center space-x-4">
          <div>
            <Input type="search" placeholder={t("navbar.search")} className="md:w-[100px] lg:w-[300px] bg-background text-foreground" />
          </div>
          {/* <LocaleSwitcher /> */}
          <NavbarAvatar />
        </div>
      </div>
    </div>
  );
}
