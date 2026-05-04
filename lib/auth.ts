import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

// Secret key untuk JWT (sebaiknya simpan di .env)
const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || "rahasia-super-kuat-untuk-jwt-kalam-12345"
);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h") // Session berlaku 24 jam
    .sign(SECRET_KEY);
}

export async function decrypt(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function getSession() {
  const sessionToken = cookies().get("session")?.value;
  if (!sessionToken) return null;
  return await decrypt(sessionToken);
}

// Fungsi bantu untuk memperbarui session (opsional)
export async function updateSession(request: NextRequest) {
  const sessionToken = request.cookies.get("session")?.value;
  if (!sessionToken) return;

  const parsed = await decrypt(sessionToken);
  if (!parsed) return;

  const res = new Response("OK", { status: 200 });
  res.headers.set(
    "Set-Cookie",
    `session=${sessionToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24}` // 24 jam
  );
  return res;
}
