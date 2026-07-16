export type EventName =
  | "cta_click"
  | "demo_play"
  | "pricing_click"
  | "faq_open"
  | "nav_click"
  | "login_click"
  | "signup_redirect"
  | "comparison_view"
  | "scroll_depth";

export type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(event: EventName, properties?: EventProperties) {
  const payload = {
    event,
    properties: {
      ...properties,
      timestamp: new Date().toISOString(),
      page: "landing",
      referrer: typeof document !== "undefined" ? document.referrer : "",
      url: typeof window !== "undefined" ? window.location.href : "",
    },
  };

  if (process.env.NEXT_PUBLIC_ANALYTICS_URL) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }

  if (process.env.NODE_ENV === "development") {
    console.log("[Analytics]", event, properties);
  }
}
