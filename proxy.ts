import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/sign-in",
});

export const config = {
  matcher: [
    // Protect app routes — unauthenticated users redirected to sign-in
    "/sessions/:path*",
    "/session/:path*",
  ],
};
