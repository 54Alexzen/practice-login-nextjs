"use client";

import { Input } from "@/components/ui/Input";
import { registerSchema, RegisterSchemaType } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
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
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterSchemaType) => {
    try {
      const res = await fetch("/api/users/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Cuenta creada exitosamente");
        reset();
        router.push("/");
      } else {
        const error = await res.json();
        toast.error(error.error || "Error al crear la cuenta");
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.error("Error de conexión");
    }
  };

  return (
    <main className="flex justify-center items-center min-h-svh">
      <section className="container mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <Input
            id="name"
            type="text"
            placeholder="Tu nombre"
            label="Nombre"
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
            {...register("password")}
            error={errors.password?.message}
          />
          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="w-full bg-blue-600 text-white rounded-full py-2 disabled:opacity-50 mt-10"
          >
            {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </form>
      </section>
    </main>
  );
}
