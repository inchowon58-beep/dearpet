"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, MessageCircle, X } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

const NAV = [
  { href: "/#breeds", label: "품종" },
  { href: "/guide", label: "지역안내" },
  { href: "/bunyang", label: "전체분양" },
];

function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <span
        aria-hidden
        className="hidden h-8 w-px bg-[#c9a56a] sm:block"
      />
      <span className="flex flex-col leading-none">
        <span className="text-[0.58rem] font-medium tracking-[0.38em] text-[#c9a56a]">
          {SITE.brandEn}
        </span>
        <span
          className="mt-1 text-[1.28rem] font-semibold tracking-[0.12em] text-white"
          style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
        >
          {SITE.brand}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const href = useKakaoHref();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0e0c0a] text-white">
      <div className="h-px bg-[linear-gradient(90deg,transparent,#c9a56a,transparent)]" />

      <div className="container flex h-[3.7rem] items-center justify-between md:h-[4.5rem]">
        <BrandMark />

        <nav className="hidden items-center gap-8 text-[0.78rem] font-medium tracking-[0.18em] text-white/60 lg:flex">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="uppercase hover:text-[#c9a56a]">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 border border-[#c9a56a] px-3.5 py-2 text-[0.72rem] font-bold tracking-[0.14em] text-[#c9a56a] uppercase sm:inline-flex hover:bg-[#c9a56a] hover:text-[#1a140c]"
            >
              <MessageCircle size={14} />
              {CTA_KAKAO}
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex p-2 text-white lg:hidden"
            aria-label="메뉴"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#0e0c0a] px-4 py-3 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2.5 text-sm font-medium tracking-[0.12em] text-white/90 hover:bg-white/8"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-2 border border-[#c9a56a] px-3 py-2.5 text-sm font-bold text-[#c9a56a]"
                onClick={() => setOpen(false)}
              >
                <MessageCircle size={16} />
                {CTA_KAKAO}
              </a>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  );
}
