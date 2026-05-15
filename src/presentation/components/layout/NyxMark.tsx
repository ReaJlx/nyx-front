export function NyxMark() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width="22" height="22" viewBox="0 0 22 22" aria-label="Nyx">
        <defs>
          <mask id="moonMask">
            <rect width="22" height="22" fill="#fff" />
            <circle cx="14.5" cy="11" r="7" fill="#000" />
          </mask>
        </defs>
        <circle cx="11" cy="11" r="8" fill="var(--bone)" mask="url(#moonMask)" />
      </svg>
      <div
        style={{
          fontFamily: "var(--mono)",
          letterSpacing: "0.22em",
          fontSize: 13,
          color: "var(--text)",
          fontWeight: 500,
        }}
      >
        NYX
      </div>
    </div>
  );
}
