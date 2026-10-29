import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { routeTree } from "@/routeTree.gen";
import { getRouter } from "@/router";
import { assetUrl } from "@/lib/utils";
import { birthday } from "@/config/birthday";
import { PhotoRevealModal } from "@/components/birthday/PhotoRevealModal";
import { FinalWish, Videos } from "@/components/birthday/sections";

describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /secret instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/secret");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("getRouter initializes router with basepath", () => {
    const router = getRouter();
    expect(router.basepath).toBe(import.meta.env.BASE_URL ?? "/");
  });
});

describe("PhotoRevealModal", () => {
  it("renders when isOpen is true", () => {
    const onProceed = vi.fn();
    render(<PhotoRevealModal isOpen={true} onProceed={onProceed} />);
    expect(
      screen.getByRole("heading", { name: /Happy Birthday, Thangachii!/i }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Happy Birthday Thangachii with Anna/i)).toBeInTheDocument();
  });
});

describe("FinalWish with Grand Finale Funny Photo & Heartfelt Message", () => {
  it("opens funny photo modal with heartfelt words when candles are blown", () => {
    render(<FinalWish />);
    const blowBtn = screen.getByRole("button", { name: /Close your eyes, make a wish & blow/i });
    expect(blowBtn).toBeInTheDocument();

    fireEvent.click(blowBtn);

    // Funny photo modal appears with Caught in 4K and Anna's message
    expect(screen.getByText(/Caught in 4K, Thangachii!/i)).toBeInTheDocument();
    expect(
      screen.getByText(/This is the happiness after all those emotions!/i),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/Caught in 4K Thangachii/i)).toBeInTheDocument();
  });
});

describe("Videos infinite film strip carousel", () => {
  it("renders film reel header and subheader", () => {
    render(<Videos />);
    expect(screen.getByText(/Our Video Memories/i)).toBeInTheDocument();
    expect(screen.getByText(/Hover to pause • Click to watch/i)).toBeInTheDocument();
  });

  it("renders video cards with titles and play buttons", () => {
    render(<Videos />);
    expect(screen.getAllByText(birthday.videos[0].title).length).toBeGreaterThan(0);
  });

  it("opens fullscreen video modal on card click and closes on close button", () => {
    render(<Videos />);
    const playButtons = screen.getAllByRole("button", { name: /Play video:/i });
    expect(playButtons.length).toBeGreaterThan(0);

    // Click first video card
    fireEvent.click(playButtons[0]);

    // Modal dialog is open
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Close video player/i })).toBeInTheDocument();

    // Click close button
    fireEvent.click(screen.getByRole("button", { name: /Close video player/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports keyboard navigation with Escape key to close modal", () => {
    render(<Videos />);
    const playButtons = screen.getAllByRole("button", { name: /Play video:/i });
    fireEvent.click(playButtons[0]);
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    // Press Escape
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
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

  it("secret photos are segregated from main page photos", () => {
    expect(birthday.secretPhotos.length).toBe(4);
    for (const secret of birthday.secretPhotos) {
      expect(birthday.photos.some((p) => p.src === secret.src)).toBe(false);
    }
  });
});
