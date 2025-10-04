"use client";

import { useSession } from "next-auth/react";
import { FacebookIcon } from "../icons/FacebookIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { Logo } from "../icons/Logo";
import { ProfileMenu } from "../elements/ProfileMenu";

const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com",
    icon: <FacebookIcon className="md:size-5 sm:size-4 size-3.5" />,
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
    icon: <InstagramIcon className="md:size-5 sm:size-4 size-3.5" />,
  },
];

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="fixed w-full top-0 left-0 z-20 border-b border-b-stone-200 bg-stone-50/50 backdrop-blur-sm">
      <nav className="container mx-auto flex justify-between items-center py-2.5 md:px-6 sm:px-5 px-4">
        <div className="flex items-center gap-2">
          <Logo className="md:size-10 sm:size-9 size-8" />
          {!session && status !== "loading" && (
            <div>
              <p className="md:text-sm sm:text-xs text-2xs font-semibold">
                Ulises Jimenez Cruz
              </p>
              <p className="md:text-xs text-2xs text-stone-500">
                Desarrollador Frontend
              </p>
            </div>
          )}
        </div>
        
        {!session && status !== "loading" && (
          <div className="flex items-center gap-1.5">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-stone-800 hover:bg-stone-800 hover:text-white transition-colors duration-300 rounded-full p-1"
                aria-label={`Visitar ${link.name}`}
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}

        {session?.user && (
          <ProfileMenu user={session.user} />
        )}
      </nav>
    </header>
  );
}