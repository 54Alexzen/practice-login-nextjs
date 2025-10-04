import { SideBar } from "@/components/elements/SideBar";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex relative">
      <SideBar />
      <main className="w-full md:py-32 sm:py-28 py-24">
        <section className="container mx-auto flex flex-col gap-4 px-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold">
            ¡Bienvenido! {session?.user?.name} 👋🏻
          </h1>
        </section>
      </main>
    </div>
  );
}
