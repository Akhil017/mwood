"use server";

import prisma from "@/db";
import { decrypt, encrypt } from "@/lib/auth";
import { LoginData } from "@/lib/schema";
import bcryptjs from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function login(loginData: LoginData) {
  const { email, password } = loginData;
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("Unauthorized user");
  }
  const validPassword = await bcryptjs.compare(password, user.password);

  if (!validPassword) {
    throw new Error("Invalid Password");
  }

  const expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ ...user, expires });

  // Save the session in a cookie
  cookies().set("session", session, { expires, httpOnly: true });
  redirect("/admin");
}

export async function logout() {
  // Destroy the session
  cookies().set("session", "", { expires: new Date(0) });
  redirect("/admin/login");
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}

export async function getSession() {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
}
