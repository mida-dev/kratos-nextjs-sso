import Image from "next/image";
import Link from "next/link";

import {
  brandLogoDark,
  brandLogoLight,
  brandMark,
  brandName,
} from "@/lib/branding";
import { cn } from "@/lib/utils";

type BrandProps = {
  className?: string;
  inverted?: boolean;
};

export function Brand({ className, inverted = false }: BrandProps) {
  const hasLogo = Boolean(brandLogoLight || brandLogoDark);
  const logoClass = cn("h-8 w-auto", inverted ? "hidden" : "dark:hidden");
  const logo = (
    <>
      <Image
        src={brandLogoLight}
        alt=""
        width={1488}
        height={356}
        className={logoClass}
      />
      <Image
        src={brandLogoDark}
        alt=""
        width={1488}
        height={356}
        className={cn("hidden h-8 w-auto", inverted ? "block" : "dark:block")}
      />
    </>
  );

  return (
    <Link
      href="/"
      aria-label={brandName}
      className={cn(
        "group inline-flex items-center gap-3 text-sm font-semibold tracking-[0.16em]",
        inverted ? "text-secondary-foreground" : "text-foreground",
        className,
      )}
    >
      {hasLogo ? (
        logo
      ) : (
        <span
          aria-hidden="true"
          className={cn(
            "text-sm font-bold tracking-normal",
            !inverted &&
              "grid size-9 place-items-center rounded-xl border border-primary/20 bg-primary",
          )}
        >
          {brandMark}
        </span>
      )}
    </Link>
  );
}
