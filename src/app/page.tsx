"use client";

import { Input } from "@/components/ui/Input";
import { loginSchema, LoginSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginSchemaType) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.ok && !res?.error) {
        toast.success("Inicio de sesión exitoso");
        router.push("/home");
        reset();
      } else {
        toast.error(res?.error || "Error al iniciar sesión");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error de conexión");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[90svh] w-full">
      <div className="absolute inset-0 -z-10 background" />
      <section className="container mx-auto flex flex-col justify-center items-center">
        <h1 className="sm:text-4xl text-3xl font-bold uppercase">Bienvenido</h1>
        <p className="max-w-md text-center sm:text-sm text-xs text-stone-500 my-3">
          Si ya cuentas con una cuenta, inicia sesión. De lo contrario, regístrate en la parte inferior.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md"
        >
          <Input
            id="email"
            type="email"
            placeholder="Ingresa tu correo electrónico"
            label="Correo Electrónico"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            id="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            label="Contraseña"
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-stone-800 text-white rounded-full sm:py-2.5 py-2 mt-10 uppercase font-semibold sm:text-sm text-xs flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin size-4" />
                <span>Iniciando sesión</span>
              </>
            ) : (
              <>
                <Send className="size-4" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>
        <div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-stone-500">o</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <div className="flex justify-center items-center gap-2 sm:text-sm text-xs">
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
