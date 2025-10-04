import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";
import NavbarApp from "@/components/layout/NavbarApp";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Frendly",
  description:
    "Red social para compartir momentos con amigos y familiares de forma sencilla y divertida.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${poppins.variable} ${poppins.className} antialiased text-stone-800`}
      >
        <AuthProvider>
          <NavbarApp />
          {children}
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
