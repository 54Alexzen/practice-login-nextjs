import { Home } from "lucide-react";
import Link from "next/link";

const options = [
  {
    icon: <Home />,
    label: "Inicio",
    href: "/home",
  },
];
export const SideBar = () => {
  return (
    <aside>
      {options.map((option) => (
        <Link key={option.label} href={option.href}>
          {option.icon}
          {option.label}
        </Link>
      ))}
    </aside>
  );
};
