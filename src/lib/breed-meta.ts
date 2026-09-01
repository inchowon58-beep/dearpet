import type { Metadata } from "next";
import type { Breed } from "./breeds";
import { kindKo } from "./breeds";
import { breedOgImages } from "./breed-images";
import { buildBreedContent, placeLabel } from "./breed-content";
import { breedPath } from "./breed-paths";
import { SITE } from "./site";

export const BREED_REVALIDATE = 86400;

export function breedMetadata(
  breed: Breed,
  origin: string,
  sido?: string,
  sigungu?: string,
  dong?: string
): Metadata {
  const content = buildBreedContent(breed, sido, sigungu, dong);
  const place = placeLabel(sido, sigungu, dong);
  const salt = [sido, sigungu, dong].filter(Boolean).join("_");
  const images = breedOgImages(breed, salt, 6);
  const url = origin + breedPath(breed.slug, sido, sigungu, dong);
  const ogImages = images.map((url) => ({
    url,
    width: 800,
    height: 600,
    alt: `${place} ${breed.name} 분양`,
  }));

  return {
    title: { absolute: content.title },
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${place} ${breed.name} 분양`,
      description: content.description,
      url,
      type: "article",
      locale: "ko_KR",
      siteName: SITE.name,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: `${place} ${breed.name} 분양`,
      description: content.description,
      images,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}

export function breedJsonLd(
  breed: Breed,
  origin: string,
  sido?: string,
  sigungu?: string,
  dong?: string
) {
  const content = buildBreedContent(breed, sido, sigungu, dong);
  const place = placeLabel(sido, sigungu, dong);
  const url = origin + breedPath(breed.slug, sido, sigungu, dong);
  const images = breedOgImages(breed, [sido, sigungu, dong].filter(Boolean).join("_"), 6);

  const crumbs = [
    { "@type": "ListItem", position: 1, name: "홈", item: origin },
    { "@type": "ListItem", position: 2, name: "견종·묘종 분양", item: `${origin}/bunyang` },
    { "@type": "ListItem", position: 3, name: breed.name, item: origin + breedPath(breed.slug) },
  ];
  if (sido) {
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: sido,
      item: origin + breedPath(breed.slug, sido),
    });
  }
  if (sido && sigungu) {
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: sigungu,
      item: origin + breedPath(breed.slug, sido, sigungu),
    });
  }
  if (dong) {
    crumbs.push({
      "@type": "ListItem",
      position: crumbs.length + 1,
      name: dong,
      item: url,
    });
  }

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: crumbs,
    },
    {
      "@context": "https://schema.org",
      "@type": "PetStore",
      name: `${place} ${breed.name} 분양 ${SITE.brand}`,
      description: content.description,
      url,
      image: images,
      areaServed: place,
      brand: SITE.brand,
      keywords: content.keywords.join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: content.h1,
      description: content.description,
      image: images,
      about: [`${kindKo(breed)}분양`, breed.name, place],
      mainEntityOfPage: url,
    },
  ];
}
