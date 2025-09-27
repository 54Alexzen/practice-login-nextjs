"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/", redirect: true });
  };

  return <button onClick={handleLogout}>Cerrar sesión</button>;
}
