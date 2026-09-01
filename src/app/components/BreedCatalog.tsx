import Link from "next/link";
import { CAT_BREEDS, DOG_BREEDS, SHELTER_BREEDS, kindKo, type Breed } from "@/lib/breeds";
import { breedCover } from "@/lib/breed-images";
import { breedPath } from "@/lib/breed-paths";

function Grid({ title, count, items }: { title: string; count: string; items: Breed[] }) {
  return (
    <section className="home-group">
      <h3>
        {title}
        <em>{count}</em>
      </h3>
      <div className="home-grid">
        {items.map((b) => (
          <Link key={b.slug} href={breedPath(b.slug)} className="home-card">
            <div className="home-card-media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={breedCover(b.folder)} alt={`${b.name} 분양`} />
            </div>
            <div className="home-card-meta">
              <small>{kindKo(b)}</small>
              <strong>{b.name}</strong>
              <b>자세히 보기</b>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function BreedCatalog() {
  return (
    <>
      <section className="home-steps">
        <div className="container">
          <ol>
            <li>
              <b>01 · Select</b>
              <span>메인에서 견종·묘종 사진으로 원하는 품종을 고릅니다.</span>
            </li>
            <li>
              <b>02 · Read</b>
              <span>각 품종 페이지에서 성격, 크기, 키우기 안내를 확인합니다.</span>
            </li>
            <li>
              <b>03 · Consult</b>
              <span>집과 맞는 아이인지 상담으로 이어 갑니다.</span>
            </li>
          </ol>
        </div>
      </section>

      <section id="breeds" className="home-breeds">
        <div className="container">
          <div className="home-breeds-head">
            <div>
              <p className="home-kicker">Collection</p>
              <h2>품종을 고르세요</h2>
            </div>
            <p>자세한 내용은 각 품종 허브에서 확인합니다. 사진이 연결하는 페이지가 안내의 본문입니다.</p>
          </div>
          <Grid title="견종" count={`${DOG_BREEDS.length} breeds`} items={DOG_BREEDS} />
          <Grid title="묘종" count={`${CAT_BREEDS.length} breeds`} items={CAT_BREEDS} />
          {SHELTER_BREEDS.length ? (
            <Grid title="보호소" count={`${SHELTER_BREEDS.length}`} items={SHELTER_BREEDS} />
          ) : null}
          <div className="home-close">
            <p>성격과 생활 리듬은 카드가 아니라, 각 품종 페이지에서 천천히 읽어 주세요.</p>
            <Link href="/bunyang" className="home-btn home-btn-ghost" style={{ display: "inline-flex" }}>
              지역별 목록
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
