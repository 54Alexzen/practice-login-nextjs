import { LoginForm } from "@/components/elements/LoginForm";
import { ParticlesBackground } from "@/components/elements/ParticlesBackground";
import { Divider } from "@/components/ui/Divider";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/home");
  }

  return (
    <main className="flex justify-center items-center w-full">
      <ParticlesBackground
        particleColor="#292524"
        lineColor="#292524"
        particleSize={2}
        speed={0.3}
        maxDistance={120}
        particleCount={80}
      />
      <section className="container mx-auto flex flex-col justify-center items-center md:px-6 sm:px-5 px-4">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold uppercase">
          Bienvenido
        </h1>
        <p className="max-w-md text-center md:text-sm sm:text-xs text-2xs text-stone-500 my-3">
          Si ya cuentas con una cuenta, inicia sesión. De lo contrario,
          regístrate en la parte inferior.
        </p>
        <LoginForm />

        <div>
          <Divider text="O" className="my-4 md:text-base sm:text-sm text-xs" />
          <div className="flex justify-center items-center gap-2 md:text-sm sm:text-xs text-2xs">
            <p>¿No tienes una cuenta?</p>
            <Link href="/register" className="underline font-semibold">
              Regístrate
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
