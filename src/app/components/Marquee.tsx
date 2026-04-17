interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  accentColor?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Marquee({
  items,
  reverse = false,
  accentColor = "var(--b-red)",
  size = "md",
  className = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  const fontSize = { sm: "0.85rem", md: "1.5rem", lg: "3.5rem" }[size];
  const letterSpacing = { sm: "0.25em", md: "0.1em", lg: "0.05em" }[size];

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className={reverse ? "marquee-rev" : "marquee-fwd"}
        style={{ display: "flex", width: "max-content", alignItems: "center" }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="font-display flex items-center gap-4 px-4 whitespace-nowrap uppercase"
            style={{ fontSize, color: "var(--b-white)", letterSpacing }}
          >
            {item}
            <span style={{ color: accentColor, fontSize: "0.55em" }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
