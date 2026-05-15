import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function RootPage() {
  const { data: session } = await auth.getSession();
  if (session?.user) {
    redirect("/sessions");
  }
  redirect("/sign-in");
}
