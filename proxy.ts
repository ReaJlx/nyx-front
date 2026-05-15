import { auth } from "@/lib/auth/server";
import { type NextRequest, NextResponse } from "next/server";

const neonMiddleware = auth.middleware({ loginUrl: "/sign-in" });

// Neon's remote auth server only trusts configured origins. Rewrite any
// external tunnel/preview URL to localhost (always trusted in dev) so the
// auth proxy route and Server Actions don't get an INVALID_ORIGIN rejection.
function rewriteOrigin(req: NextRequest): Headers | null {
  const origin = req.headers.get("origin") ?? "";
  if (!origin || origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
    return null;
  }
  const headers = new Headers(req.headers);
  headers.set("origin", process.env.NEON_AUTH_TRUSTED_LOCAL_ORIGIN ?? "http://localhost:3002");
  return headers;
}

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path.startsWith("/sessions") || path.startsWith("/session")) {
    return neonMiddleware(req);
  }

  const overridden = rewriteOrigin(req);
  if (overridden) {
    return NextResponse.next({ request: { headers: overridden } });
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sessions/:path*",
    "/session/:path*",
    "/api/auth/:path*",
    "/sign-in",
    "/sign-up",
  ],
};
