import { SessionView } from "@/presentation/components/session/SessionView";

export default async function SessionPage() {
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <SessionView />
    </div>
  );
}
