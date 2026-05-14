"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties } from "react";

type CardProps = {
  title: string;
  summary: string;
  href: string;
  image: string;
};

export function InteractiveServiceCard({ title, summary, href, image }: CardProps) {
  const card = useRef<HTMLAnchorElement | null>(null);

  const onMove = (x: number, y: number) => {
    if (!card.current) {
      return;
    }
    const rect = card.current.getBoundingClientRect();
    const offsetX = x - rect.left;
    const offsetY = y - rect.top;
    const rotateY = ((offsetX - rect.width / 2) / rect.width) * 12;
    const rotateX = ((rect.height / 2 - offsetY) / rect.height) * 12;
    card.current.style.setProperty("--x", `${rotateX.toFixed(2)}deg`);
    card.current.style.setProperty("--y", `${rotateY.toFixed(2)}deg`);
    card.current.style.setProperty("--spot-x", `${((offsetX / rect.width) * 100).toFixed(2)}%`);
    card.current.style.setProperty("--spot-y", `${((offsetY / rect.height) * 100).toFixed(2)}%`);
  };

  return (
    <Link
      ref={card}
      href={href}
      onMouseMove={(event) => onMove(event.clientX, event.clientY)}
      onTouchMove={(event) => {
        const touch = event.touches[0];
        if (touch) {
          onMove(touch.clientX, touch.clientY);
        }
      }}
      onMouseLeave={() => {
        card.current?.style.setProperty("--x", "0deg");
        card.current?.style.setProperty("--y", "0deg");
      }}
      className="tilt-card group relative min-h-[320px] overflow-hidden rounded-[1.6rem] border border-border p-5"
      style={
        {
          "--x": "0deg",
          "--y": "0deg",
          "--spot-x": "50%",
          "--spot-y": "50%",
        } as CSSProperties
      }
    >
      <Image src={image} alt={title} fill className="object-cover transition duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-b from-surface/20 via-surface/75 to-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--spot-x)_var(--spot-y),rgba(142,255,145,0.25),transparent_40%)]" />
      <div className="relative z-10 space-y-3">
        <p className="inline-flex rounded-full border border-accent/40 bg-accent/12 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-text">
          Service line
        </p>
        <h3 className="font-display text-3xl text-base-text">{title}</h3>
        <p className="text-sm leading-relaxed text-muted-text">{summary}</p>
      </div>
    </Link>
  );
}
