import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "@/i18n/routing";

interface NavbarAvatarProps {
  handleLogout: () => void;
  handleLogin: () => void;
}

const NavbarAvatar = ({ handleLogout, handleLogin }: NavbarAvatarProps) => {
  const principalState = useSelector((state: RootState) => state.principal);
  const router = useRouter();

  const headerNavbarAvatarDropdownMenuItems = [
    {
      title: "Profile",
      onClick: () => router.push({ pathname: "/profile/[id]", params: { id: principalState.id } }),
    },
    {
      title: "My Watchlist",
      onClick: () => router.push({ pathname: "/profile/[id]/watchlist", params: { id: principalState.id } }),
    },
    {
      title: "Settings",
      onClick: () => router.push({ pathname: "/settings" }),
    },
  ];

  return (
    <>
      {principalState.isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={principalState.avatarUrl} alt={`${principalState.firstName} ${principalState.lastName}`} />
                <AvatarFallback>{`${principalState.firstName[0].toUpperCase()}${principalState.lastName[0].toUpperCase()}`}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">shadcn</p>
                <p className="text-xs leading-none text-muted-foreground">m@example.com</p>
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
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
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
