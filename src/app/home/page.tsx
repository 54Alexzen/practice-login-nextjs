import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section>
        <h1>Home Page</h1>
        <p>{session?.user?.email}</p>
      </section>
    </main>
  );
}
