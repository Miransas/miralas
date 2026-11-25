"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Retain the existing API for callers; all colors use the monochrome system.
export type GlowButtonColor = "red" | "rose" | "blue" | "emerald" | "purple" | "amber";
export type GlowButtonSize = "sm" | "md" | "lg" | "xl";

export interface GlowButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
  color?: GlowButtonColor;
  size?: GlowButtonSize;
  showIcon?: boolean;
  icon?: ReactNode;
  target?: string;
  rel?: string;
}

export function GlowButton({
  children = "See in Action",
  href,
  color: _color,
  size = "md",
  showIcon = true,
  icon,
  className,
  onClick,
  target,
  rel,
  ...props
}: GlowButtonProps) {
  const classes = cn(
    buttonVariants({ size: size === "sm" ? "sm" : size === "md" ? "default" : "lg" }),
    className,
  );
  const content = <><span>{children}</span>{showIcon && (icon || <ArrowRight aria-hidden="true" />)}</>;

  return (
    <div className="relative inline-flex items-center">
      {href ? (
        <Link href={href} target={target} rel={rel} className={classes} aria-label={props["aria-label"]}>
          {content}
        </Link>
      ) : (
        <button type="button" onClick={onClick} className={classes} {...props}>
          {content}
        </button>
      )}
    </div>
  );
}
