import { NextRequest, NextResponse } from "next/server";

import { verifyToken } from "@/lib/jwt";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const pathname = req.nextUrl.pathname;

  const publicApiRoutes = [
    "/api/auth/login",
    "/api/auth/register",
  ];

  const isApiRoute =
    pathname.startsWith("/api");

  const isProtectedPage =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/agendamentos");

  if (
    isApiRoute &&
    publicApiRoutes.includes(pathname)
  ) {
    return NextResponse.next();
  }

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json(
        {
          error: "Não autenticado",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  try {
    verifyToken(token);

    return NextResponse.next();
  } catch {
    if (isApiRoute) {
      return NextResponse.json(
        {
          error: "Token inválido",
        },
        {
          status: 401,
        }
      );
    }

    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }
}

export const config = {
  matcher: [
    "/api/:path*",
    "/dashboard/:path*",
    "/admin/:path*",
    "/agendamentos/:path*",
  ],
};