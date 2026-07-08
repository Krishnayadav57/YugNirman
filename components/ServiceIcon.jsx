const MAP = {
  "brain-circuit": "◆",
  globe: "◎",
  smartphone: "▤",
  cloud: "☁",
  workflow: "⇄",
  "building-2": "▦",
  palette: "◐",
  "settings-2": "⚙",
  layers: "▥",
};

export default function ServiceIcon({ icon, className = "" }) {
  return (
    <div
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-semibold bg-gradient-to-br from-primary/25 to-accent/20 text-white ${className}`}
    >
      {MAP[icon] || "✦"}
    </div>
  );
}
