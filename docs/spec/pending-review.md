# Pending review

Things the weekly ingest found but will not commit on its own: **new catalog entries** and **synopsis text**. Everything else it finds — dates, episode counts, retitles on a hangul match, cast, air labels, poster refreshes — it applies and pushes itself (see `MASTER_SPEC.md` Section 13 and the 2026-10-30 entry in `decisions.md`).

The weekly run rewrites this file: it adds what it finds and removes what has been accepted. To accept an item, say so in the KALENDAR session and it gets committed to the catalog and struck from here.

**Last updated:** 2026-11-22

---

## ⚠ MyDramaList API still offline — week three

`my-drama-list-api-ten.vercel.app` still returns **HTTP 402 `DEPLOYMENT_DISABLED`** on every path. Three weeks, unchanged.

Posters on file keep rendering and the stub screen is clean (68 blobs, 0 stubs), but nothing new can get a poster or an episode count, and the release-pattern derivation has no input. DramaWiki and Soompi have both carried the last three runs between them, and have been enough for dates, cast and premises — just not for those three fields.

Still open, and now worth a decision one way or the other: whether to put Wikipedia behind the episode-count and air-date gap. It is already a named source in Section 13 and properly licensed. It would **not** solve posters — Wikipedia's poster images are fair-use, not freely licensed — so that side stays stuck whatever happens. A plain "no, leave it" is a fine answer; I would rather stop re-raising it than keep it open indefinitely.

---

## New titles awaiting review — 1

| Air date | Network | Title | Hangul | Eps | Poster | Lead cast |
|---|---|---|---|---|---|---|
| 2026-12-18 | Coupang Play | Family Matters 2 | 가족계획 2 | — | — | Bae Doo-na, Baek Yoon-shik, Lomon, Lee Soo-hyun, Park Byung-eun |

**This one is time-sensitive** — it premieres in under four weeks. It has been sitting in "watching, not yet actionable" for a month as a bare "2026"; DramaWiki gave it a specific date this week. Soompi also ran the first main-cast look on 2026-11-19, so a synopsis could go in with it: a mother who can edit people's memories, taking on the bad guys alongside her family. Park Byung-eun joins the family this season.

---

## Synopses awaiting review — 2

| Entry | Premise, as reported | Source |
|---|---|---|
| Your Ground | A baseball player whose career has stalled (Gong Myung as Kang Hae-hwan) and the former lawyer turned sports agent who takes him on (Han Hyo-joo as Seo Hee-seung). Kim Shin-rok plays the agency's CEO | Soompi, first stills, 2026-11-19 |
| Good Partner 2 | Divorce law, second season. Jang Na-ra returns as star lawyer Cha Eun-kyung and sets out to recruit Kim Hye-yoon onto her team | Soompi, cast keywords + premiere coverage, 2026-11-19/21 |

Good Partner 2 premiered on 2026-11-20, above season one's ratings and first in its slot.

---

## Watching, not yet actionable

- **Embassy for Foreign Monsters in Korea** (주한이국대사관, tvN) — accepted into the catalog on 2026-11-15 at 2027-08-28; tvN's row dropped it to a bare "2027" this week. **First reading of the withdrawal**, so the catalog is unchanged. Second reading due 2026-11-29. Low stakes — it is nine months out either way.
- **Your Ground** (너의 그라운드, MBC) — Soompi has begun calling this ***On* Your Ground**, where DramaWiki still says *Your Ground*. The hangul is unchanged and literally reads "Your Ground", so this may just be Soompi's styling rather than a retitle. Not applied on one source; watching for DramaWiki to agree.
- **The Wife** (더 와이프, MBC) — Kim Hee-sun and Go Soo, still a bare "2027".
- **While You're Here** — Kim Hyang-gi and Ahn Dong-gu. DramaWiki still carries no row anywhere; no hangul, network or date. Unchanged for weeks.
- **Gracefully Killing You** (고분고분한 킬러, TVING) — title and cast settled, still a bare "2027".
- **Wi-Fi Love in the Palace** — Soompi tags it both Film and TV/Film and its copy does not say which, so the format stays unconfirmed. Still excluded.

## Known gaps that no source can currently close

- **The Second Signal** (두 번째 시그널, tvN) — **premieres 2026-12-07, a fortnight away**, still no episode count and no poster. The most conspicuous gap in the catalog, and it will still be there on premiere day unless the API returns.
- **The fourteen titles accepted on 2026-11-15** — all without posters; all but Wolves in Suits and Unnatural without an episode count.
- **Nightmare** (악몽, SBS), **Love O'Clock** (24분의 1 로맨스), **Salon de Nabi** (날아올라라 나비), **All of Us Are Dead 2** (지금 우리 학교는 2), **Happy Anding** (뜨거운 안녕).

### Resolved on 2026-11-22

Both of last week's flagged withdrawals held on a second reading and were applied:

- **Portraits of Delusion** (현혹, Disney+) moved from December 2026 to the TBA bucket. This was the one that mattered — the catalog had been advertising a date three weeks out for a show that has slipped out of 2026 entirely.
- **Wild Flowers Bloom in the Palace** (궁에는 개꽃이 산다, MBC) moved from May 2027 to TBA.

Both keep their `id`, cast, episode count and synopsis, and will sort straight back into place if a date returns.
