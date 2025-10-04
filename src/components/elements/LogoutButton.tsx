import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "../ui/Button";

interface LogoutButtonProps {
  type?: "text" | "icon" | "both";
}

export const LogoutButton = ({ type = "both" }: LogoutButtonProps) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="menu"
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
    </Button>
  );
};
