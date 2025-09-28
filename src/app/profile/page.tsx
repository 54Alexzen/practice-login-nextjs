import { authOptions } from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <main className="w-full md:py-32 sm:py-28 py-24 min-h-[90svh] flex items-center">
      <section className="container mx-auto flex flex-col justify-center items-center px-4">
        <h1 className="md:text-base sm:text-sm text-xs text-center">
          Sitio en construcción
        </h1>
        <h2 className="md:text-3xl sm:text-2xl text-xl font-bold text-center">
          Proximamente
        </h2>
        <h3 className="md:text-5xl sm:text-4xl text-3xl font-bold md:mt-3 sm:mt-2 mt-1 text-center">
          Perfil de {session?.user?.name}
        </h3>

        <Link
          href={"/home"}
          className="w-fit bg-stone-800 text-white rounded-full md:px-6 sm:px-5 px-4 py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        >
          <ArrowLeft className="md:size-4 size-3.5" />
          Regresar al Inicio
        </Link>
      </section>
    </main>
  );
}
