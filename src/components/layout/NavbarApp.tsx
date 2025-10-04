import { Bell, MessageCircleMore } from "lucide-react";
import { Logotipo } from "../icons/Logotipo";
import { Button } from "../ui/Button";

export default function NavbarApp() {
  return (
    <header className="sticky w-full h-fit inset-0 z-20 border-b border-b-stone-200 bg-white/50 backdrop-blur-sm">
      <nav className="container mx-auto flex justify-between items-center py-2.5 md:px-6 sm:px-5 px-4">
        <Logotipo />
        <div className="flex items-center gap-1.5">
          <Button href="/notifications" variant="icon">
            <Bell className="md:size-4 size-3.5" />
          </Button>
          <Button href="/profile" variant="icon">
            <MessageCircleMore className="md:size-4 size-3.5" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
