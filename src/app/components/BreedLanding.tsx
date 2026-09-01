import type { CSSProperties } from "react";
import Link from "next/link";
import type { Breed } from "@/lib/breeds";
import { CAT_BREEDS, DOG_BREEDS } from "@/lib/breeds";
import type { BreedLandingContent } from "@/lib/breed-content";
import { placeLabel } from "@/lib/breed-content";
import { breedPhotos } from "@/lib/breed-images";
import { breedPath, bunyangPath } from "@/lib/breed-paths";
import type { KoreaSigungu } from "@/lib/korea-regions";
import {
  getDongs,
  getSigungus,
  neighborDongs,
  neighborSigungus,
  SIDOS,
} from "@/lib/korea-regions";
import BreedPhoto from "./BreedPhoto";
import BreedInquiryForm from "./BreedInquiryForm";

export default function BreedLanding({
  breed,
  content,
  sido,
  sigungu,
  dong,
  pagePath,
}: {
  breed: Breed;
  content: BreedLandingContent;
  sido?: string;
  sigungu?: string;
  dong?: string;
  pagePath: string;
}) {
  const photos = breedPhotos(breed, [sido, sigungu, dong].filter(Boolean).join("_"));
  const place = placeLabel(sido, sigungu, dong);
  const nearbyGu = sido && sigungu ? neighborSigungus(sido, sigungu, 8) : [];
  const nearbyDong = sido && sigungu && dong ? neighborDongs(sido, sigungu, dong, 8) : [];
  const dongList = sido && sigungu && !dong ? getDongs(sido, sigungu) : [];
  const sidoList = !sido ? SIDOS : [];
  const sigunguList: KoreaSigungu[] = sido && !sigungu ? getSigungus(sido) : [];
  const otherSidos = sido && !sigungu ? SIDOS.filter((s) => s !== sido) : [];
  const samePlace = (slug: string) => {
    if (sido && sigungu && dong) return breedPath(slug, sido, sigungu, dong);
    if (sido && sigungu) return breedPath(slug, sido, sigungu);
    if (sido) return breedPath(slug, sido);
    return breedPath(slug);
  };

  const style = {
    "--bl-accent": breed.palette.accent,
    "--bl-soft": breed.palette.accentSoft,
    "--bl-ink": breed.palette.ink,
    "--bl-muted": breed.palette.muted,
    "--bl-paper": breed.palette.paper,
    "--bl-card": breed.palette.card,
    "--bl-deep": breed.palette.deep,
  } as CSSProperties;

  return (
    <div className="bl-root" data-shape="round" style={style}>
      <div className="bl-wrap">
        <nav className="bl-crumb" aria-label="경로">
          <Link href="/">홈</Link>
          <span>/</span>
          <Link href={bunyangPath()}>견종·묘종 분양</Link>
          <span>/</span>
          <Link href={breedPath(breed.slug)}>{breed.name}</Link>
          {sido ? (
            <>
              <span>/</span>
              <Link href={breedPath(breed.slug, sido)}>{sido}</Link>
            </>
          ) : null}
          {sido && sigungu ? (
            <>
              <span>/</span>
              <Link href={breedPath(breed.slug, sido, sigungu)}>{sigungu}</Link>
            </>
          ) : null}
          {dong ? (
            <>
              <span>/</span>
              <span>{dong}</span>
            </>
          ) : null}
        </nav>
      </div>

      <header className="bl-wrap bl-hero-simple">
        <p className="bl-kicker">{content.kicker}</p>
        <h1 className="bl-h1">{content.h1}</h1>
        <p className="bl-lead">{content.lead}</p>
        <div className="bl-hero-photo bl-hero-photo-wide">
          <BreedPhoto src={photos.hero} alt={`${content.h1} 대표 사진`} priority sizes="100vw" />
        </div>
        <div className="bl-prose bl-intro">
          {content.intro.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </div>
      </header>

      {content.steps.map((step, idx) => (
        <section
          key={step.n}
          className={`bl-step-sec${idx % 2 === 1 ? " bl-step-sec-tint" : ""}`}
        >
          <div className="bl-wrap">
            <p className="bl-step-n">{step.kicker}</p>
            <h2 className="bl-h2">{step.h2}</h2>
            {step.paragraphs.map((p) => (
              <p key={p.slice(0, 26)} className="bl-lead">
                {p}
              </p>
            ))}
            {step.items?.length ? (
              <div className="bl-check-box">
                {step.itemLabel ? <p className="bl-check-label">{step.itemLabel}</p> : null}
                <ol className={step.n === "3" ? "bl-process" : "bl-check-ul"}>
                  {step.items.map((item, i) => (
                    <li key={item}>
                      {step.n === "3" ? <span>{String(i + 1).padStart(2, "0")}</span> : null}
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
            {step.n === "2" ? (
              <div className="bl-ency-photo bl-step-photo">
                <BreedPhoto src={photos.essay} alt={`${place} ${breed.name} 집 환경`} sizes="100vw" />
              </div>
            ) : null}
            {step.n === "4" ? (
              <div className="bl-observe">
                {content.observe.cards.map((card) => (
                  <article key={card.title} className="bl-observe-card">
                    <h3>{card.title}</h3>
                    <p>{card.lead}</p>
                    <ul>
                      {card.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </section>
      ))}

      <section className="bl-care">
        <div className="bl-wrap">
          <p className="bl-kicker">{content.care.kicker}</p>
          <h2 className="bl-h2">{content.care.h2}</h2>
          <p className="bl-lead">{content.care.lead}</p>
          <div className="bl-care-grid">
            {content.care.items.map((item) => (
              <article key={item.n} className="bl-care-card">
                <span>{item.n}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
          <p className="bl-care-closer">{content.care.closer}</p>
        </div>
      </section>

      {photos.grid.length ? (
        <section className="bl-wrap bl-photos" aria-label="사진">
          {photos.grid.map((src, i) => (
            <div key={src} className="bl-photos-cell">
              <BreedPhoto src={src} alt={`${place} ${breed.name} ${i + 1}`} sizes="25vw" />
            </div>
          ))}
        </section>
      ) : null}

      <section className="bl-wrap bl-block">
        <p className="bl-kicker">FAQ</p>
        <h2 className="bl-h2">보호자님들의 공통된 궁금증</h2>
        <div className="bl-faq-list">
          {content.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bl-wrap bl-block">
        <p className="bl-kicker">LOCAL</p>
        <h2 className="bl-h2">{content.local.h2}</h2>
        {content.local.paragraphs.map((p) => (
          <p key={p.slice(0, 22)} className="bl-lead">
            {p}
          </p>
        ))}

        {sidoList.length ? (
          <div className="bl-link-card">
            <h3>시·도별 {breed.name} 분양</h3>
            <div className="bl-links">
              {sidoList.map((s) => (
                <Link key={s} className="bl-chip" href={breedPath(breed.slug, s)}>
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {sigunguList.length ? (
          <div className="bl-hub-grid">
            {sigunguList.map((r) => (
              <Link key={r.sigungu} className="bl-hub-card" href={breedPath(breed.slug, r.sido, r.sigungu)}>
                <strong>
                  {r.sigungu} {breed.name} 분양
                </strong>
                <span>{r.sido} · 동·읍·면 안내</span>
              </Link>
            ))}
          </div>
        ) : null}

        {otherSidos.length ? (
          <div className="bl-link-card">
            <h3>다른 시·도 {breed.name} 분양</h3>
            <div className="bl-links">
              {otherSidos.map((s) => (
                <Link key={s} className="bl-chip" href={breedPath(breed.slug, s)}>
                  {s}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {dongList.length ? (
          <div className="bl-link-card">
            <h3>
              {sigungu} 행정구역별 {breed.name} 분양
            </h3>
            <div className="bl-links">
              {dongList.map((d) => (
                <Link key={d} className="bl-chip" href={breedPath(breed.slug, sido, sigungu, d)}>
                  {d}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {nearbyDong.length ? (
          <div className="bl-link-card">
            <h3>
              {sigungu} 이웃 동 {breed.name} 분양
            </h3>
            <div className="bl-links">
              {nearbyDong.map((d) => (
                <Link key={d} className="bl-chip" href={breedPath(breed.slug, sido, sigungu, d)}>
                  {d}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {nearbyGu.length ? (
          <div className="bl-link-card">
            <h3>
              {sido} 인근 시·군·구 {breed.keyword}
            </h3>
            <div className="bl-links">
              <Link className="bl-chip" href={breedPath(breed.slug)}>
                {breed.name} 전체
              </Link>
              {sido ? (
                <Link className="bl-chip" href={breedPath(breed.slug, sido)}>
                  {sido} 전체
                </Link>
              ) : null}
              {nearbyGu.map((r) => (
                <Link key={r.sigungu} className="bl-chip" href={breedPath(breed.slug, r.sido, r.sigungu)}>
                  {r.sigungu}
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="bl-link-card">
          <h3>전체 견종 분양</h3>
          <div className="bl-links">
            {DOG_BREEDS.map((b) => (
              <Link
                key={b.slug}
                className="bl-chip"
                href={samePlace(b.slug)}
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="bl-link-card">
          <h3>전체 묘종 분양</h3>
          <div className="bl-links">
            {CAT_BREEDS.map((b) => (
              <Link
                key={b.slug}
                className="bl-chip"
                href={samePlace(b.slug)}
              >
                {b.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bl-closer">
        <div className="bl-wrap">
          <h2 className="bl-h2">{content.closer.h2}</h2>
          <p className="bl-lead">{content.closer.lead}</p>
        </div>
      </section>

      <section className="bl-inquiry" id="inquiry">
        <div className="bl-wrap">
          <p className="bl-kicker" style={{ color: "#f0c9a8" }}>
            INQUIRY
          </p>
          <h2 className="bl-h2">{content.cta}</h2>
          <p className="bl-lead">
            {place} {breed.name} 희망 시기와 가족 구성만 남겨 주셔도 상담이 시작됩니다.
          </p>
          <BreedInquiryForm
            breedName={breed.name}
            place={place}
            cta={content.cta}
            pagePath={pagePath}
          />
        </div>
      </section>
    </div>
  );
}
