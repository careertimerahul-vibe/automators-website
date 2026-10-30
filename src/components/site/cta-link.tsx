"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

export function CtaLink({
  className,
  location,
  children,
}: {
  className?: string;
  location: string;
  children: ReactNode;
}) {
  return (
    <Link className={className} href="/contact" onClick={() => track("cta_consultation_opened", { location })}>
      {children}
    </Link>
  );
}
