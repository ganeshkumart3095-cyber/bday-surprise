import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { getRouter } from "@/router";
import { assetUrl } from "@/lib/utils";
import { birthday } from "@/config/birthday";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("getRouter initializes router with basepath", () => {
    const router = getRouter();
    expect(router.basepath).toBe(import.meta.env.BASE_URL ?? "/");
  });
});

describe("assetUrl and birthday media paths", () => {
  it("resolves asset paths with base URL", () => {
    const base = import.meta.env.BASE_URL ?? "/";
    const normalizedBase = base.endsWith("/") ? base : `${base}/`;
    expect(assetUrl("/images/photo1.jpg")).toBe(`${normalizedBase}images/photo1.jpg`);
    expect(assetUrl("images/photo1.jpg")).toBe(`${normalizedBase}images/photo1.jpg`);
    expect(assetUrl("")).toBe("");
    expect(assetUrl("https://example.com/photo.jpg")).toBe("https://example.com/photo.jpg");
  });

  it("all configured photos and videos have valid relative asset URLs", () => {
    expect(birthday.photos.length).toBeGreaterThan(0);
    for (const photo of birthday.photos) {
      expect(photo.src).toContain("images/");
      expect(photo.src.startsWith("http://") || photo.src.startsWith("/")).toBe(true);
    }

    expect(birthday.videos[0]?.src).toContain("videos/video1.mp4");
  });
});
