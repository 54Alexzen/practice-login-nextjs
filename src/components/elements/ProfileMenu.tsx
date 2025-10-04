"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

interface ProfileMenuProps {
  user: { 
    name?: string | null; 
    email?: string | null; 
    image?: string | null;
  };
}

export const ProfileMenu = ({ user }: ProfileMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLatter = user?.name?.charAt(0) || "U";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);
  return (
    <div className="flex items-center gap-2 relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={`Perfil de ${user?.name}`}
        className="bg-stone-300 rounded-full md:size-9 sm:size-8 size-7 md:text-base sm:text-sm text-xs flex justify-center items-center cursor-pointer"
      >
        {firstLatter}
      </button>
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute right-0 -bottom-44 bg-stone-50 border border-stone-200 rounded-lg shadow-lg p-2 flex flex-col"
        >
          <div className="flex flex-col items-center gap-1 bg-stone-100 p-4 rounded-md">
            <p className="md:text-sm sm:text-xs text-2xs font-semibold">
              {user?.name || "Usuario"}
            </p>
            <p className="md:text-xs text-2xs">{user?.email || "Sin correo"}</p>
          </div>

          <div className="mt-4 flex flex-col gap-1">
            <Link
              href="/profile"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-2 hover:bg-stone-200 px-2.5 py-1.5 rounded-md transition-colors md:text-sm sm:text-xs text-2xs cursor-pointer"
            >
              <User className="size-3.5" />
              Ver perfil
            </Link>

            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};
