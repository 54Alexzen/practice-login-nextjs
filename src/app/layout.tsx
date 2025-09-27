import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/AuthProvider";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Proyecto de carrera",
  description: "Proyecto de carrera de Ulises (login)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${poppins.className} antialiased`}>
        <AuthProvider>
          {children}
          <Toaster position="top-center" />
        </AuthProvider>
      </body>
    </html>
  );
}
