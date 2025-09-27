import LogoutButton from "@/components/LogoutButton";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }
  return (
    <main>
      <section>
        <h1>Home Page</h1>
        <p>{session?.user?.email}</p>
      </section>

      <LogoutButton />
    </main>
  );
}
