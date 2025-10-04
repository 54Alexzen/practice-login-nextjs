import { Logotipo } from "../icons/Logotipo";

export default function NavbarApp() {
  return (
    <header className="sticky w-full h-fit inset-0 z-20 border-b border-b-stone-200 bg-stone-50/50 backdrop-blur-sm">
      <nav className="container mx-auto flex justify-between items-center py-2.5 md:px-6 sm:px-5 px-4">
        <Logotipo />
        <div className="flex items-center gap-1.5">
          
        </div>
      </nav>
    </header>
  );
}
