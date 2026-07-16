"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";
import type { EventName, EventProperties } from "@/lib/landing-analytics";
import { useTrackEvent } from "@/hooks/use-track-event";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  trackEvent: EventName;
  trackProperties?: EventProperties;
};

export function TrackedLink({
  trackEvent,
  trackProperties,
  onClick,
  ...props
}: TrackedLinkProps) {
  const track = useTrackEvent();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    track(trackEvent, trackProperties);
    onClick?.(event);
  }

  return <a {...props} onClick={handleClick} />;
}
