import { FacebookIcon } from "../icons/FacebookIcon";
import { InstagramIcon } from "../icons/InstagramIcon";
import { Logotipo } from "../icons/Logotipo";

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
  return (
    <header className="sticky w-full h-fit inset-0 z-20 border-b border-b-stone-200 bg-stone-50/50 backdrop-blur-sm">
      <nav className="container mx-auto flex justify-between items-center py-2.5 md:px-6 sm:px-5 px-4">
        <Logotipo />
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
      </nav>
    </header>
  );
}
