import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt } from "@/lib/auth";

// Daftar rute yang perlu diproteksi
const protectedRoutes = ["/dashboard", "/admin"];
const authRoutes = ["/login"];

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.includes(path);

  // Ambil token dari cookies
  const sessionToken = request.cookies.get("session")?.value;
  
  // Dekripsi JWT untuk mendapatkan payload
  const session = sessionToken ? await decrypt(sessionToken) : null;

  // Jika user mencoba akses rute terproteksi tapi belum login
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Jika user sudah login tapi mencoba akses halaman login
  if (isAuthRoute && session) {
    // Redirect ke halaman yang sesuai dengan role
    if (session.role === "ADMIN") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Jika mencoba akses /admin tapi bukan admin
  if (path.startsWith("/admin") && session?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
