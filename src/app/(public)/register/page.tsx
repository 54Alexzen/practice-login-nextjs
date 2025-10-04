import { ParticlesBackground } from "@/components/elements/ParticlesBackground";
import { RegisterForm } from "@/components/elements/RegisterForm";
import { Divider } from "@/components/ui/Divider";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="flex justify-center items-center min-h-[90svh] w-full">
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
          Crear una cuenta nueva
        </h1>
        <p className="max-w-md text-center md:text-sm sm:text-xs text-2xs text-stone-500 my-3">
          Si aun no cuentas con una cuenta, regístrate en el formulario. De lo
          contrario, inicia sesión.
        </p>
        <RegisterForm />
        <div>
          <Divider text="O" className="my-4 md:text-base sm:text-sm text-xs" />

          <div className="flex justify-center items-center gap-2 md:text-sm sm:text-xs text-2xs">
            <p>¿Ya tienes una cuenta?</p>
            <Link href="/" className="underline font-semibold">
              Inicia sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
