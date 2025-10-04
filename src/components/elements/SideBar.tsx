"use client";
import { Home, User } from "lucide-react";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

const options = [
  {
    icon: <Home className="size-5" />,
    label: "Inicio",
    href: "/home",
  },
  {
    icon: <User className="size-5" />,
    label: "Perfil",
    href: "/profile",
  },
];
export const SideBar = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;

  return (
    <aside className="sticky top-0 left-0 min-h-svh bg-stone-50 border-r border-r-stone-200 flex flex-col items-center py-4 gap-6 max-w-72 w-full">
      {options.map((option) => (
        <Button
          key={option.label}
          href={option.href}
          variant="menu"
          className="flex items-center gap-2 md:text-base sm:text-sm text-xs font-semibold"
          component="link"
          disabled={isActive(option.href)}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
      <LogoutButton />
    </aside>
  );
};
