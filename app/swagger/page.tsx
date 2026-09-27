"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { appPath } from "@/lib/paths";

declare global {
  interface Window {
    SwaggerUIBundle?: {
      (options: Record<string, unknown>): void;
      presets: { apis: unknown };
    };
  }
}

export default function SwaggerPage() {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    if (!scriptLoaded || !window.SwaggerUIBundle) return;
    window.SwaggerUIBundle({
      url: appPath("/api/openapi"),
      dom_id: "#swagger-ui",
      deepLinking: true,
      presets: [window.SwaggerUIBundle.presets.apis],
      layout: "BaseLayout",
    });
  }, [scriptLoaded]);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css"
      />
      <Script
        src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"
        strategy="afterInteractive"
        onLoad={() => setScriptLoaded(true)}
      />
      <div id="swagger-ui" />
    </>
  );
}
