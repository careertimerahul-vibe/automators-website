"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";
import { bookingHref } from "@/lib/booking";

export function CtaLink({
  className,
  location,
  children,
}: {
  className?: string;
  location: string;
  children: ReactNode;
}) {
  const booking = bookingHref();
  const onClick = () => track("cta_consultation_opened", { location });
  if (booking) {
    return (
      <a className={className} href={booking} target="_blank" rel="noopener noreferrer" onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} href="/contact" onClick={onClick}>
      {children}
    </Link>
  );
}
