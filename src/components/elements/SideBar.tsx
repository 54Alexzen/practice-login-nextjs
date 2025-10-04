"use client";
import { Home, Settings, User } from "lucide-react";
import { Button } from "../ui/Button";
import { LogoutButton } from "./LogoutButton";
import { usePathname } from "next/navigation";

const options = [
  {
    icon: <Home className="md:size-5 size-4" />,
    label: "Inicio",
    href: "/home",
  },
  {
    icon: <User className="md:size-5 size-4" />,
    label: "Perfil",
    href: "/profile",
  },
  {
    icon: <Settings className="md:size-5 size-4" />,
    label: "Configuración",
    href: "/settings",
  },
];
export const SideBar = () => {
  const pathname = usePathname();
  return (
    <aside className="sticky top-0 left-0 border-x border-x-stone-200 flex flex-col items-center p-6 gap-2 max-w-64 w-full min-h-full">
      {options.map((option) => (
        <Button
          key={option.label}
          href={option.href}
          variant="menu"
          pathname={pathname}
        >
          {option.icon}
          {option.label}
        </Button>
      ))}
      <LogoutButton />
    </aside>
  );
};
