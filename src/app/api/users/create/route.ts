import db from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { registerSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      const errors = parsed.error.issues
        .map((issue) => issue.message)
        .join(", ");
      return NextResponse.json(
        {
          error: "VALIDATION_ERROR",
          message: `Datos inválidos: ${errors}`,
        },
        { status: 400 }
      );
    }

    const { email, name, password } = parsed.data;

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return NextResponse.json(
        {
          error: "EMAIL_ALREADY_EXISTS",
          message:
            "Ya existe una cuenta con este correo electrónico. Intenta iniciar sesión.",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const stmt = db.prepare(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)"
    );

    const result = stmt.run(email, name, hashedPassword);

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente",
      user: { id: result.lastInsertRowid, email, name },
    });
  } catch (error: unknown) {
    console.error("Error creating user:", error);

    if (
      error instanceof Error &&
      (error.message.includes("UNIQUE constraint failed") ||
        error.message === "SQLITE_CONSTRAINT_UNIQUE")
    ) {
      return NextResponse.json(
        {
          error: "EMAIL_ALREADY_EXISTS",
          message: "Ya existe una cuenta con este correo electrónico.",
        },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        error: "SERVER_ERROR",
        message: "Error interno del servidor. Inténtalo más tarde.",
      },
      { status: 500 }
    );
  }
}
