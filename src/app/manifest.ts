import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Opslin",
    short_name: "Opslin",
    description: "Deploy and manage applications on your own VPS.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f6f2",
    theme_color: "#0d1712",
  };
}
