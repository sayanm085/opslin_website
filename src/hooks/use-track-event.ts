"use client";

import { useCallback } from "react";
import {
  trackEvent,
  type EventName,
  type EventProperties,
} from "@/lib/landing-analytics";

export function useTrackEvent() {
  return useCallback((event: EventName, properties?: EventProperties) => {
    trackEvent(event, properties);
  }, []);
}
