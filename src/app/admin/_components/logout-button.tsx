"use client";

import { Button } from "@/components/ui/button";
import { logout } from "../_actions/auth";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  return (
    <Button
      className="w-full justify-start"
      variant="ghost"
      onClick={async () => {
        await logout();
      }}
      size="sm"
    >
      <LogOut className="w-4 h-4 text-muted-foreground mr-2" />
      Log out
    </Button>
  );
}
