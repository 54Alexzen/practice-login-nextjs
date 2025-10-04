import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface LogoutButtonProps {
  type?: "text" | "icon" | "both";
}

export const LogoutButton = ({ type = "both" }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 hover:bg-stone-200 px-2.5 py-1.5 rounded-md transition-colors md:text-sm sm:text-xs text-2xs cursor-pointer"
    >
      {type === "icon" && (
        <span>
          <LogOut className="size-3.5" />
        </span>
      )}
      {type === "text" && <span>Cerrar sesión</span>}
      {type === "both" && (
        <>
          <span>
            <LogOut className="size-3.5" />
          </span>
          <span>Cerrar sesión</span>
        </>
      )}
    </button>
  );
};
