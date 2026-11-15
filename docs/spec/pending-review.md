# Pending review

Things the weekly ingest found but will not commit on its own: **new catalog entries** and **synopsis text**. Everything else it finds — dates, episode counts, retitles on a hangul match, cast, air labels, poster refreshes — it applies and pushes itself (see `MASTER_SPEC.md` Section 13 and the 2026-10-30 entry in `decisions.md`).

The weekly run rewrites this file: it adds what it finds and removes what has been accepted. To accept an item, say so in the KALENDAR session and it gets committed to the catalog and struck from here.

**Last updated:** 2026-11-15

---

## ⚠ MyDramaList API still offline — week two

`my-drama-list-api-ten.vercel.app` still returns **HTTP 402 `DEPLOYMENT_DISABLED`** on every path. Unchanged from 2026-11-08, and still a billing shutdown rather than an outage, so it will not clear by itself.

Posters already on file keep rendering (`i.mydramalist.com` is unaffected), and the stub screen ran clean again — 68 blobs, 0 stubs. But two weeks of episode counts, poster refreshes and release-pattern derivation are now missing, and **every new title below has no episode count and no poster** because that is where both came from.

The replacement-source question from last week is still open. Nothing is broken and nothing is urgent, but the gap compounds: a month from now the new entries will still be bare. Wikipedia is already a named source in Section 13 and would cover episode counts and dates, though not posters — its poster images are fair-use, not freely licensed, so that side stays stuck regardless. Say the word if you want me to scope it.

---

## New titles awaiting review — 14

DramaWiki rewrote much of its index on 2026-11-14 and twelve newly dated titles appeared at once. All are confirmed and dated there, matched by hangul, and absent from the catalog. **No episode counts or posters on any of them** — see the note above.

**Soon enough to matter (next four months):**

| Air date | Network | Title | Hangul | Lead cast |
|---|---|---|---|---|
| 2027-02-13 | JTBC | Gold Digger | 골드디거 | Kim Hee-ae, Noh Sang-hyun, Kim Ji-eun, Cha Hak-yun, Park Soo-oh |
| 2027-02-26 | MBC | Wolves in Suits | 라인의 법칙 | Jang Ki-yong, Oh Jung-se, Kwak Shi-yang |
| 2027-03-03 | SBS | Dash | 대쉬 | Shin Hye-sun, Kim Joon-han, Kim Seo-hyung |
| 2027-03-27 | JTBC | Human X Gumiho | 인간X구미호 | Jun Ji-hyun, Ji Chang-wook, Kang Yoo-suk, Cha Joo-young |

Wolves in Suits was held at "2027-01" last week and now carries a specific date.

**Later in 2027:**

| Air date | Network | Title | Hangul | Lead cast |
|---|---|---|---|---|
| 2027-04-19 | ENA | The Queen of Taming | 조련의 여왕 | Lee Joo-myung, Kim Young-kwang |
| 2027-05 | MBC | Mind Doctor | 마인드 닥터 | Kang Ha-neul, Kim Hye-joon, Heo Joon-ho, Kim Sun-young |
| 2027-05 | JTBC | Rediscovery of Love | 연애의 재발견 | Kim So-yun, Kim Ji-suk, Yoon Hyun-min, Hwang Woo-seul-hye |
| 2027-05-28 | SBS | Love Bait | 꽃은 미끼야 | Woo Do-hwan, Chae Soo-bin |
| 2027-05-31 | ENA | Handle with Care | 그녀는 취급주의 | Hyeri, Na In-woo |
| 2027-06-05 | tvN | Unnatural | 언내추럴 | Im Yoon-ah, Lee Jin-wook, Cha Kang-yoon |
| 2027-07-09 | SBS | Pyramid | 피라밋 | Yoon Kye-sang, Kang Han-na |
| 2027-07-12 | ENA | Green Light | 그린라이트 | Choi Hyun-wook, Jung Chae-yun |
| 2027-07-17 | tvN | My Reason to Die | 내가 죽기로 결심한 것은 | Lee Chae-min, Noh Yoon-seo |
| 2027-08-28 | tvN | Embassy for Foreign Monsters in Korea | 주한이국대사관 | Lee Jun-ho, Hong Hwa-yun, Kang Han-na, Yoo In-soo, Lee Joo-yun |

Fourteen is a lot to decide at once. Taking just the top table would keep the next four months current and leave the rest to firm up.

---

## Synopses awaiting review — 8

These catalog entries render "No summary on file for this one yet." Each premise is from Soompi's own coverage and would be rewritten fresh in KALENDAR's voice before going in — never copied or lightly reworded, per Section 14.

| Entry | Premise, as reported | Source |
|---|---|---|
| Crash 2: Fury Road | The Namgang Police Station traffic-crime team is promoted to a regional investigative unit and takes on bigger cases, with Jisung as its newest member | Soompi, episode 1 preview, 2026-11-13 |
| Sacred Jewel | Goryeo, 1258: an expedition unit near the end of the thirty-year war with Mongolia. Claudia Kim is a princess shut off from the world; Lee Sung-min a veteran commander guiding Ahn Bo-hyun's character | Soompi, cast interviews, 2026-11-13 |
| Nine to Six | A workaholic office worker, played by Park Min-young, meets the warm-hearted Han Seon-woo | Soompi, teaser, 2026-11-13 |
| Tantara | People with nothing who bet everything on making it in Korea's entertainment industry, across the 1960s and the 1980s | Soompi, posters and teaser, 2026-11-13 |
| The Substitute | A crime thriller about three young men and a dangerous deal, set on college entrance exam day | Soompi, cast interview, 2026-11-05 |
| Gift | A webtoon-based sports drama; Cha Been and Han Si-hyun play rivals for ace of the baseball team | Soompi, character preview, 2026-11-13 |
| One-of-a-Kind Romance | A webtoon adaptation; premiered 2026-11-09 | Soompi, cast interviews, 2026-11-06 |
| Full Count | An SBS baseball drama; Kim Rae-won's character is set on winning | Soompi, teaser, 2026-10-31 |

Full Count and One-of-a-Kind Romance are still genre labels rather than premises, three weeks running. Both have now aired or are close, so coverage should improve.

---

## Watching, not yet actionable

- **Wild Flowers Bloom in the Palace** (궁에는 개꽃이 산다, MBC) — **tracked at May 2027, but DramaWiki dropped it to a bare "2027" this week.** First reading of the withdrawal, so the catalog is unchanged; if next week agrees it moves to the TBA bucket.
- **Portraits of Delusion** (현혹, Disney+) — **tracked at December 2026, but DramaWiki now lists it under a bare "2027".** Also a first reading, also unchanged. This one matters more than the Wild Flowers case: if it is real, the catalog is showing a date four weeks out for a show that has slipped a year. Worth a second look next week either way.
- **The Wife** (더 와이프, MBC) — was held at 2027-06, now back to a bare "2027". No month, so it drops out of the new-titles table until one returns.
- **While You're Here** — Kim Hyang-gi and Ahn Dong-gu. DramaWiki still carries no row anywhere; no hangul, network or date. Unchanged for several weeks.
- **Gracefully Killing You** (고분고분한 킬러, TVING) — title and cast settled, still a bare "2027".
- **Family Matters 2** (가족계획 2, Coupang Play) — still "2026" with no month, and six weeks of 2026 left.
- **Wi-Fi Love in the Palace** — excluded as a film for three weeks. This week Soompi tagged it both Film and TV/Film and its copy no longer says which, so the format is now genuinely unconfirmed rather than settled. Still out, but no longer on firm ground.

## Known gaps that no source can currently close

Cannot be re-checked while the API is down; carried forward.

- **The Second Signal** (두 번째 시그널, tvN, 2026-12-07) — **premieres in three weeks** and still has no episode count and no poster. tvN confirmed the December date publicly on 2026-11-06. The most conspicuous gap in the catalog right now.
- **Nightmare** (악몽, SBS, 2027-04-09) — hangul only ever matches unrelated 1968 and 2020 dramas.
- **Love O'Clock** (24분의 1 로맨스) and **Salon de Nabi** (날아올라라 나비).
- **All of Us Are Dead 2** (지금 우리 학교는 2).
- **Happy Anding** (뜨거운 안녕, tvN) — premiered 2026-11-11, holding 1.7% ratings. Has a poster from an earlier run; no record surfaces under its hangul.

### Resolved this run

- **Doctor X** finished on 2026-11-14 at 15.2% nationwide, the week's top-rated programme, and its air pattern could finally be pinned down **without MyDramaList**: the entry's own start date (Oct 9) is a Friday, Soompi's ratings report puts the finale on Saturday Nov 14, and 12 episodes were already on file. Friday/Saturday over six weekends is exactly 12 episodes ending Nov 14. Nothing else fits, so `airLabel` went from a bare "Weekly" to "Fri / Sat".
