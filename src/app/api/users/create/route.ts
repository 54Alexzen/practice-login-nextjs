import db from "@/lib/db";
import { hashPassword } from "@/lib/hash";
import { registerSchema } from "@/lib/validations";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const { email, name, password } = parsed.data;

    const existingUser = db
      .prepare("SELECT id FROM users WHERE email = ?")
      .get(email);

    if (existingUser) {
      return NextResponse.json(
        { error: "El correo ya está en uso" },
        { status: 400 }
      );
    }

    // const hashedPassword = await hashPassword(password);

    const stmt = db.prepare(
      "INSERT INTO users (email, name, password) VALUES (?, ?, ?)"
    );

    const result = stmt.run(email, name, password);
    console.log("✅ User created successfully:", {
      email,
      name,
      password,
      id: result.lastInsertRowid,
    });

    return NextResponse.json({
      success: true,
      message: "Usuario creado exitosamente",
      user: { id: result.lastInsertRowid, email, name },
    });
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.message === "SQLITE_CONSTRAINT_UNIQUE"
    ) {
      return NextResponse.json(
        { error: "El correo ya está en uso" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
