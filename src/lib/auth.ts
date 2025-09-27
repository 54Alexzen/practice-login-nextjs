import { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "./db";
import { comparePassword } from "./hash";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = db
          .prepare(
            "SELECT id, email, password, name FROM users WHERE email = ?"
          )
          .get(credentials.email) as
          | {
              id: number;
              email: string;
              password: string;
              name: string;
            }
          | undefined;

        if (!user) return null;

        const isValid = await comparePassword(
          credentials.password,
          user.password
        );
        if (!isValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/" },
};