"use client";
import { registerSchema, RegisterSchemaType } from "@/lib/validations";
import { getErrorMessage } from "@/utils/errorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export const RegisterForm = () => {
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
      <Button type="submit" disabled={!isValid || isSubmitting} variant="form">
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
      </Button>
    </form>
  );
};
