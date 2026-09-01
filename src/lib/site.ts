/** 디어펫 — 견종·묘종 분양 사이트 공통 설정 */

export const SITE = {
  name: "디어펫",
  brand: "디어펫",
  brandEn: "DEAR PET",
  farm: "디어펫",
  title: "디어펫 | 견종·묘종 분양",
  tagline: "품종을 고르고, 자세한 안내는 각 페이지에서 확인하세요",
  taglineEn: "Dear Pet",
  description:
    "디어펫은 견종·묘종을 품종별로 안내하는 분양 사이트입니다. 메인에서 사진을 고르신 뒤, 각 품종 페이지에서 성격·크기·키우기를 확인하세요.",
  keywords: [
    "디어펫",
    "견종분양",
    "묘종분양",
    "강아지분양",
    "고양기분양",
    "품종분양",
    "포메라니안분양",
    "랙돌분양",
    "메인쿤분양",
  ],
  kakaoOpenChatUrl: "",
  logo: "https://image.cattery.co.kr/ragdoll/01.webp",
  ogImage: "https://image.cattery.co.kr/ragdoll/01.webp",
  imageBase: "https://image.cattery.co.kr",
  imageCount: 40,
  location: "대한민국 전국",
  address: "전국 분양 상담 · 관리자에서 등록한 카카오톡",
  areaServed: "대한민국 전국",
  domain: "deatpet.breederclub.co.kr",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://deatpet.breederclub.co.kr",
  infocsUrl: "https://www.infocs.co.kr/",
  naverSiteVerification: "4a03fc1b40c992c4421073ac20cdf757519ab007",
  themeColor: "#0e0c0a",
} as const;

export const KEYWORD_INQUIRY =
  "성격 · 크기 · 키우기는 각 품종 페이지에서 확인하신 뒤 상담으로 이어 주세요.";

export const CTA_LABEL = "카카오톡 오픈채팅 상담";
export const CTA_KAKAO = "카카오톡 상담하기";
export const CTA_RENTAL = "사이트 임대 · 제휴 문의";
export const CTA_EMERGENCY = "분양 상담";
export const CTA_MEMORIAL = "품종 사진 보기";
export const CTA_BUILD = "자동화사이트구축/렌탈문의";
export const CTA_GALLERY = "품종 둘러보기";
export const CTA_YOUTUBE = "유튜브에서 시청하기";
export const CTA_YOUTUBE_HEADING = "관련 유튜브 시청하기";

/** 본문·CTA 공통 안내 문구 */
export const KAKAO_CTA_HINT =
  "카카오톡 상담은 관리자에서 오픈채팅을 등록한 뒤에만 연결됩니다.";
