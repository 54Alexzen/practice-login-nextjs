import z from "zod";

export const loginSchema = z.object({
  email: z.email("Dirección de correo no válida"),
  password: z.string().min(6).max(100).nonempty("La contraseña es obligatoria"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100),
  email: z.email("Dirección de correo no válida"),
  password: z.string().min(6).max(100).nonempty("La contraseña es obligatoria"),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
