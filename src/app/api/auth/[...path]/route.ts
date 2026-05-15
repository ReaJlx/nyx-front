import { auth } from "@/lib/auth/server";
import { type NextRequest } from "next/server";

const TRUSTED_LOCAL_ORIGIN =
  process.env.NEON_AUTH_TRUSTED_LOCAL_ORIGIN ?? "http://localhost:3002";

// Neon's remote auth server only trusts configured origins. We normalise any
// external (tunnel / preview) origin to localhost before the proxy forwards it.
function normaliseOrigin(req: NextRequest): Request {
  const origin = req.headers.get("origin") ?? "";
  if (
    !origin ||
    origin.startsWith("http://localhost") ||
    origin.startsWith("http://127.0.0.1")
  ) {
    return req;
  }
  const headers = new Headers(req.headers);
  headers.set("origin", TRUSTED_LOCAL_ORIGIN);
  return new Request(req.url, { method: req.method, headers, body: req.body, duplex: "half" } as RequestInit);
}

const handlers = auth.handler();

type Ctx = { params: Promise<{ path: string[] }> };

const wrap =
  (h: (req: Request, ctx: Ctx) => Promise<Response>) =>
  (req: NextRequest, ctx: Ctx) =>
    h(normaliseOrigin(req), ctx);

export const GET = wrap(handlers.GET);
export const POST = wrap(handlers.POST);
export const PUT = wrap(handlers.PUT);
export const DELETE = wrap(handlers.DELETE);
export const PATCH = wrap(handlers.PATCH);
