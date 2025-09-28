"use client";

import { Input } from "@/components/ui/Input";
import { loginSchema, LoginSchemaType } from "@/lib/validations";
import { getErrorMessage } from "@/utils/errorMessage";
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
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginSchemaType>({
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
        toast.success("¡Bienvenido! Inicio de sesión exitoso.");
        router.push("/home");
        reset();
      } else {
        toast.error(getErrorMessage(res?.error || "UNKNOWN_ERROR"));
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(getErrorMessage(error.message));
      } else {
        toast.error(getErrorMessage("UNKNOWN_ERROR"));
      }
    }
  };

  return (
    <main className="flex justify-center items-center min-h-[90svh] w-full">
      <div className="absolute inset-0 -z-10 background" />
      <section className="container mx-auto flex flex-col justify-center items-center md:px-6 sm:px-5 px-4">
        <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold uppercase">
          Bienvenido
        </h1>
        <p className="max-w-md text-center md:text-sm sm:text-xs text-2xs text-stone-500 my-3">
          Si ya cuentas con una cuenta, inicia sesión. De lo contrario,
          regístrate en la parte inferior.
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
            className="w-full bg-stone-800 text-white rounded-full py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin md:size-4 size-3.5" />
                <span>Iniciando sesión</span>
              </>
            ) : (
              <>
                <Send className="md:size-4 size-3.5" />
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>

        <div>
          <div className="flex items-center my-4 md:text-base sm:text-sm text-xs">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-stone-500">O</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

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
