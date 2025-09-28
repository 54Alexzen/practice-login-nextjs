import z from "zod";

export const loginSchema = z.object({
  email: z.email("Dirección de correo no válida"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede exceder los 50 caracteres"),
});

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede exceder los 100 caracteres"),
  email: z.email("Dirección de correo no válida"),
  password: z
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(50, "La contraseña no puede exceder los 50 caracteres"),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
