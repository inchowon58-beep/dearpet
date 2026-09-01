"use client";

import Link from "next/link";
import { MapPin, MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { useKakaoHref } from "./KakaoHrefProvider";

export default function Footer() {
  const kakaoHref = useKakaoHref();
  return (
    <footer className="border-t border-white/10 bg-[#0e0c0a] py-12 text-[#f4efe6]">
      <div className="container grid gap-8 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Link href="/" className="inline-block">
            <p className="text-[0.62rem] font-semibold tracking-[0.38em] text-[#c9a56a]">{SITE.brandEn}</p>
            <h2
              className="mt-1 text-3xl font-semibold tracking-[0.12em] hover:text-white"
              style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif' }}
            >
              {SITE.brand}
            </h2>
          </Link>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{SITE.tagline}</p>
        </div>

        <div className="space-y-3 text-sm text-white/70">
          {kakaoHref ? (
            <a
              href={kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-[#c9a56a]"
            >
              <MessageCircle size={16} className="text-[#c9a56a]" />
              {CTA_KAKAO}
            </a>
          ) : null}
          <p className="flex items-start gap-2">
            <MapPin size={16} className="mt-0.5 shrink-0 text-[#c9a56a]" />
            {SITE.location} · {SITE.address}
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <Link
              href="/#breeds"
              className="inline-flex border border-white/20 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-white/80 transition hover:border-[#c9a56a] hover:text-[#c9a56a]"
            >
              품종
            </Link>
            <Link
              href="/bunyang"
              className="inline-flex border border-white/20 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-white/80 transition hover:border-[#c9a56a] hover:text-[#c9a56a]"
            >
              전체분양
            </Link>
            <Link
              href="/admin"
              className="inline-flex border border-white/20 px-3 py-2 text-xs font-semibold tracking-[0.12em] text-white/80 transition hover:border-[#c9a56a] hover:text-[#c9a56a]"
            >
              관리자
            </Link>
          </div>
          <p className="pt-2 text-xs text-white/30">
            © {new Date().getFullYear()} {SITE.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
