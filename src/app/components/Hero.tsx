"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE, CTA_KAKAO } from "@/lib/site";
import { breedPath } from "@/lib/breed-paths";
import { useKakaoHref } from "./KakaoHrefProvider";

const HERO_SHOTS = [
  { slug: "포메라니안", name: "포메라니안", src: "https://image.cattery.co.kr/pome/01.webp" },
  { slug: "랙돌", name: "랙돌", src: "https://image.cattery.co.kr/ragdoll/01.webp" },
  { slug: "골든리트리버", name: "골든리트리버", src: "https://image.cattery.co.kr/coldenret/01.webp" },
] as const;

export default function Hero() {
  const kakaoHref = useKakaoHref();
  return (
    <section id="top" className="home-hero container">
      <div className="home-hero-copy">
        <p className="home-kicker">{SITE.brandEn}</p>
        <h1 className="home-title">{SITE.brand}</h1>
        <p className="home-lead">
          견종과 묘종을 사진으로 고르고, 자세한 성격·크기·키우기는 각 품종 페이지에서
          확인하세요.
        </p>
        <p className="home-note">{SITE.tagline}</p>
        <div className="home-actions">
          <a href="#breeds" className="home-btn home-btn-gold">
            품종 둘러보기
          </a>
          {kakaoHref ? (
            <a
              href={kakaoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="home-btn home-btn-ghost"
            >
              <MessageCircle size={16} />
              {CTA_KAKAO}
            </a>
          ) : null}
        </div>
      </div>
      <div className="home-hero-gallery">
        {HERO_SHOTS.map((shot) => (
          <Link key={shot.slug} href={breedPath(shot.slug)} className="home-hero-shot">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={shot.src} alt={`${shot.name} 분양`} />
            <span>{shot.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
