import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import LogoutButton from "./logout-button";

type ProfileDropdownProps = {
  user: {
    name: string;
    email: string;
  };
};

export default function ProfileDropdown({ user }: ProfileDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback className="bg-primary text-black font-semibold">
              {user ? user?.name?.toUpperCase().slice(0, 2) : <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal flex gap-2">
          <Avatar className="h-8 w-8 bg-primary">
            <AvatarFallback className="bg-primary text-black font-semibold">
              {user ? user?.name?.toUpperCase().slice(0, 2) : <User />}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user ? user.name : ""}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user ? user?.email : ""}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
