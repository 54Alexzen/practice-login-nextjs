"use client";

import { Divider } from "@/components/ui/Divider";
import { Input } from "@/components/ui/Input";
import { registerSchema, RegisterSchemaType } from "@/lib/validations";
import { getErrorMessage } from "@/utils/errorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success(
          "¡Cuenta creada exitosamente!. Ya puedes iniciar sesión."
        );
        reset();
        router.push("/");
      } else {
        const errorData = await res.json();
        toast.error(getErrorMessage(errorData.error || "UNKNOWN_ERROR"));
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
          Crear una cuenta nueva
        </h1>
        <p className="max-w-md text-center md:text-sm sm:text-xs text-2xs text-stone-500 my-3">
          Si aun no cuentas con una cuenta, regístrate en el formulario. De lo
          contrario, inicia sesión.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full max-w-md"
        >
          <Input
            id="name"
            type="text"
            placeholder="Tu nombre"
            label="Nombre"
            maxLength={100}
            {...register("name")}
            error={errors.name?.message}
          />
          <Input
            id="email"
            type="email"
            placeholder="correo@example.com"
            label="Email"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            id="password"
            type="password"
            placeholder="********"
            label="Contraseña"
            maxLength={51}
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-stone-800 text-white rounded-full py-2.5 mt-10 uppercase font-semibold md:text-sm sm:text-xs text-2xs flex justify-center items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin md:size-4 size-3.5" />
                <span>Creando cuenta</span>
              </>
            ) : (
              <>
                <Send className="md:size-4 size-3.5" />
                <span>Crear cuenta</span>
              </>
            )}
          </button>
        </form>
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
