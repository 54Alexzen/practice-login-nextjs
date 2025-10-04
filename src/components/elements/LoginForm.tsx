"use client";

import { toast } from "sonner";
import { Input } from "../ui/Input";
import { getErrorMessage } from "@/utils/errorMessage";
import { Loader, Send } from "lucide-react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchemaType } from "@/lib/validations";
import { signIn } from "next-auth/react";
import { Button } from "../ui/Button";

export const LoginForm = () => {
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
      <Button type="submit" disabled={!isValid || isSubmitting}>
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
      </Button>
    </form>
  );
};
