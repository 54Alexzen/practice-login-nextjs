const socialLinks = [
  {
    name: "Facebook",
    url: "https://facebook.com",
  },
  {
    name: "Twitter",
    url: "https://twitter.com",
  },
  {
    name: "Instagram",
    url: "https://instagram.com",
  },
];

export default function Navbar() {
  return (
    <header className="fixed bg-white/10 backdrop-blur-md w-full top-0 left-0 z-20 border-b border-b-stone-200 min-h-[5svh] flex items-center px-4">
      <nav>
        <div>
            <p>Ulises Jimenez Cruz</p>
        </div>
        <div>
            {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mx-2 text-white hover:underline"
          >
            {link.name}
          </a>
        ))}
        </div>
      </nav>
    </header>
  );
}
