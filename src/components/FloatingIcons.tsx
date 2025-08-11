import { Music } from "lucide-react";

export default function FloatingIcons() {
  const icons = [
    { pos: "top-24 right-16", size: "w-10 h-10", anim: "animate-pulse" },
    { pos: "bottom-20 left-16", size: "w-8 h-8" },
    { pos: "top-1/2 left-10", size: "w-12 h-12", anim: "animate-bounce" },
  ];

  return (
    <>
      {icons.map((icon, i) => (
        <div
          key={i}
          className={`fixed ${icon.pos} ${icon.size} text-white/15 ${
            icon.anim || ""
          }`}
        >
          <Music className="w-full h-full" />
        </div>
      ))}
    </>
  );
}
