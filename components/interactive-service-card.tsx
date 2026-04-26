"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type InteractiveServiceCardProps = {
  title: string;
  summary: string;
  value: string;
  image: string;
  href: string;
};

export function InteractiveServiceCard({
  title,
  summary,
  value,
  image,
  href,
}: InteractiveServiceCardProps) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  const updateTilt = (clientX: number, clientY: number) => {
    if (!cardRef.current) {
      return;
    }

    const bounds = cardRef.current.getBoundingClientRect();
    const x = clientX - bounds.left;
    const y = clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const rotateY = ((x - centerX) / centerX) * 7;
    const rotateX = -((y - centerY) / centerY) * 7;

    cardRef.current.style.setProperty("--rotate-x", `${rotateX.toFixed(2)}deg`);
    cardRef.current.style.setProperty("--rotate-y", `${rotateY.toFixed(2)}deg`);
    cardRef.current.style.setProperty("--spot-x", `${((x / bounds.width) * 100).toFixed(1)}%`);
    cardRef.current.style.setProperty("--spot-y", `${((y / bounds.height) * 100).toFixed(1)}%`);
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={(event) => updateTilt(event.clientX, event.clientY)}
      onMouseLeave={() => {
        cardRef.current?.style.setProperty("--rotate-x", "0deg");
        cardRef.current?.style.setProperty("--rotate-y", "0deg");
        cardRef.current?.style.setProperty("--spot-x", "50%");
        cardRef.current?.style.setProperty("--spot-y", "50%");
      }}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (touch) {
          updateTilt(touch.clientX, touch.clientY);
        }
      }}
      className="tilt-card group relative flex min-h-[380px] flex-col justify-end overflow-hidden rounded-[1.8rem] border border-white/15 p-6"
      style={
        {
          "--rotate-x": "0deg",
          "--rotate-y": "0deg",
          "--spot-x": "50%",
          "--spot-y": "50%",
        } as React.CSSProperties
      }
    >
      <Image
        src={image}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#021109]/10 via-[#021109]/65 to-[#020b06]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(156,255,162,0.24),transparent_42%)]" />

      <div className="relative z-10 space-y-3">
        <p className="inline-flex rounded-full border border-[#b6f3b8]/40 bg-[#93ff97]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#b6f3b8]">
          Service
        </p>
        <h3 className="font-display text-3xl leading-tight text-white">{title}</h3>
        <p className="text-sm leading-relaxed text-[#dbefde]">{summary}</p>
        <p className="text-sm font-semibold text-[#9ff59f]">{value}</p>
      </div>
    </Link>
  );
}
