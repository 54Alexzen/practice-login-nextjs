"use client";

import { Input } from "@/components/ui/Input";
import { loginSchema, LoginSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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
    <main className="flex justify-center items-center min-h-svh">
      <section className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            id="email"
            type="email"
            placeholder="correo@example.com"
            label="Correo Electrónico"
            {...register("email")}
            error={errors.email?.message}
          />
          <Input
            id="password"
            type="password"
            placeholder="********"
            label="Contraseña"
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-blue-600 text-white rounded-full py-2 disabled:opacity-50 mt-10"
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
          </button>
        </form>
      </section>
    </main>
  );
}
