export default function AppLayout({ children }: { children: React.ReactNode }) {
  // Auth guard added after Neon auth setup
  return <>{children}</>;
}
