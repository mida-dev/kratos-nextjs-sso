import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

let __brandLogoLight = "";
let __brandLogoDark = "";

vi.mock("@/lib/branding", () => ({
  get brandLogoLight() {
    return __brandLogoLight;
  },
  get brandLogoDark() {
    return __brandLogoDark;
  },
  brandMark: "KS",
  brandName: "Kratos SSO",
  brandFaviconLight: "",
  brandFaviconDark: "",
}));

import { Brand } from "./brand";

describe("Brand", () => {
  it("links accessibly to home and renders both configured logo variants", () => {
    __brandLogoLight = "/custom-light.svg";
    __brandLogoDark = "/custom-dark.svg";

    const markup = renderToStaticMarkup(<Brand className="brand-custom" />);

    expect(markup).toContain('href="/"');
    expect(markup).toContain('aria-label="Kratos SSO"');
    expect(markup).toContain("brand-custom");
    expect(markup).toContain('src="/custom-light.svg"');
    expect(markup).toContain('src="/custom-dark.svg"');
    expect(markup).not.toContain(">Kratos SSO</a>");
  });

  it("uses inverted text and logo classes when requested", () => {
    __brandLogoLight = "/custom-light.svg";
    __brandLogoDark = "/custom-dark.svg";

    const markup = renderToStaticMarkup(<Brand inverted />);

    expect(markup).toContain("text-secondary-foreground");
    expect(markup).toMatch(/<img[^>]*class="[^"]*hidden[^"]*"/);
    expect(markup).toMatch(/<img[^>]*class="[^"]*block[^"]*"/);
  });

  it("uses the accessible brand mark without an image when no logo is configured", () => {
    __brandLogoLight = "";
    __brandLogoDark = "";

    const markup = renderToStaticMarkup(<Brand />);

    expect(markup).toContain('href="/"');
    expect(markup).toContain('aria-label="Kratos SSO"');
    expect(markup).toContain(">KS</span>");
    expect(markup).not.toContain("<img");
  });

  it("does not render an image when one logo URL is empty", () => {
    __brandLogoLight = "";
    __brandLogoDark = "/custom-dark.svg";

    const markup = renderToStaticMarkup(<Brand />);

    expect(markup).not.toContain('src=""');
    expect(markup).toContain('src="/custom-dark.svg"');
  });

  it("renders only the configured logo when the dark URL is empty", () => {
    __brandLogoLight = "/custom-light.svg";
    __brandLogoDark = "";

    const markup = renderToStaticMarkup(<Brand />);

    expect(markup).not.toContain('src=""');
    expect(markup).toContain('src="/custom-light.svg"');
  });
});
