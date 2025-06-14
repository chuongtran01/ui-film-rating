import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { persistor, RootState } from "@/redux/store";
import { useRouter } from "@/i18n/routing";
import { resetPrincipalAction } from "@/redux/features/principal/principalSlice";
import authService from "@/services/auth";
import { useTranslations } from "next-intl";

const NavbarAvatar = () => {
  const t = useTranslations();

  const principalState = useSelector((state: RootState) => state.principal);
  const router = useRouter();
  const dispatch = useDispatch();

  const headerNavbarAvatarDropdownMenuItems = [
    {
      title: t("navbar.avatar.myProfile"),
      onClick: () => router.push({ pathname: "/profile/reviews" }),
    },
  ];

  const handleLogout = async () => {
    await authService.logout();
    dispatch(resetPrincipalAction());
    await persistor.purge();
    router.push("/auth");
  };

  const handleLogin = () => {
    router.push({ pathname: "/auth" });
  };

  return (
    <>
      {principalState.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={principalState.avatarUrl} alt={`${principalState.displayName}`} />
                <AvatarFallback>{`${principalState.displayName?.charAt(0).toUpperCase()}`}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{principalState.displayName}</p>
                <p className="text-xs leading-none text-muted-foreground">{principalState.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {headerNavbarAvatarDropdownMenuItems.map((item) => (
                <DropdownMenuItem key={item.title} onClick={item.onClick}>
                  {item.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>{t("navbar.avatar.logout")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={handleLogin} className="bg-primary text-primary-foreground font-semibold hover:bg-primary/90">
          Log in
        </Button>
      )}
    </>
  );
};

export default NavbarAvatar;
