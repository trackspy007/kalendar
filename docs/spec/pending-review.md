# Pending review

Things the weekly ingest found but will not commit on its own: **new catalog entries** and **synopsis text**. Everything else it finds — dates, episode counts, retitles on a hangul match, cast, air labels, poster refreshes — it applies and pushes itself (see `MASTER_SPEC.md` Section 13 and the 2026-10-30 entry in `decisions.md`).

The weekly run rewrites this file: it adds what it finds and removes what has been accepted. To accept an item, say so in the KALENDAR session and it gets committed to the catalog and struck from here.

**Last updated:** 2026-11-08

---

## ⚠ The MyDramaList API is down, and this one may not come back

Every path on `my-drama-list-api-ten.vercel.app`, the root included, now returns **HTTP 402 `DEPLOYMENT_DISABLED`**. That is Vercel switching the deployment off over billing, not the API erroring — it is categorically different from the HTTP 500 bursts and the two week-long outages this source has had before, and it will not clear on its own with a retry. It is somebody's unofficial side project, so it may never return.

**What still works:** `i.mydramalist.com` serves images normally, so every poster already on file keeps rendering. DramaWiki and Soompi were both fine this run.

**What this run could not do:** check any episode count, refresh any poster, discover a poster for a title that lacks one, or read any release pattern — `aired`, `aired_on` and `episodes` all came from that API. The Nov 1 run's `epsPerDrop` work and the stub-poster screen both depend on it too. The stub screen still ran against the embedded blobs and found none.

**Worth deciding when you have a moment** (not urgent — nothing is broken, the catalog is just frozen on these fields): whether to find a replacement structured source. `mydramalist.com` itself is still blocked by this environment's network policy, so going direct would need that policy changed. Wikipedia is already a named source in Section 13, is properly licensed, and carries episode counts and air dates for titles that have an article. I have not gone looking for a replacement — say the word if you want me to.

---

## New titles awaiting review — 3

Unchanged from last week; all three were re-confirmed on DramaWiki this run. Episode counts and posters are from the last successful MyDramaList read, on 2026-11-01.

| Air date | Network | Title | Hangul | Eps | Poster | Lead cast |
|---|---|---|---|---|---|---|
| 2027-01 | MBC | Wolves in Suits | 라인의 법칙 | 12 | yes | Jang Ki-yong, Oh Jung-se, Kwak Shi-yang |
| 2027-06-05 | tvN | Unnatural | 언내추럴 | 12 | yes | Im Yoon-ah, Lee Jin-wook, Cha Kang-yoon |
| 2027-06 | MBC | The Wife | 더 와이프 | — | — | Kim Hee-sun, Go Soo |

Still nothing urgent — the nearest is seven weeks out.

---

## Synopses awaiting review — 6

These catalog entries render "No summary on file for this one yet." Each premise is from Soompi's own coverage and would be rewritten fresh in KALENDAR's voice before going in — never copied or lightly reworded, per Section 14.

| Entry | Premise, as reported | Source |
|---|---|---|
| The Substitute | A crime thriller about three young men and a dangerous deal, set on college entrance exam day | Soompi, cast interview, 2026-11-05 |
| Sacred Jewel | Goryeo, 1258: an expedition unit near the end of the thirty-year war with Mongolia. Claudia Kim is a princess shut off from the world; Yoon Kyun-sang a commander who is also her first love | Soompi, casting feature, 2026-11-06 |
| Crash 2: Fury Road | Lee Min-ki's T.C.I. traffic-crime team takes on a new case, with Jisung joining as its newest member | Soompi, stills, 2026-11-06 |
| Nine to Six | An office romance between Park Min-young's and Yook Sung-jae's characters | Soompi, behind-the-scenes teaser, 2026-11-06 |
| One-of-a-Kind Romance | A webtoon adaptation; premieres 2026-11-09 | Soompi, cast interviews, 2026-11-06 |
| Full Count | An SBS baseball drama; Kim Rae-won's character is set on winning | Soompi, teaser, 2026-10-31 |

Full Count and One-of-a-Kind Romance are both still thin — one more week of coverage would give either a real premise rather than a genre label.

---

## Watching, not yet actionable

- **While You're Here** — Kim Hyang-gi and Ahn Dong-gu, a survival romance. DramaWiki still carries no row anywhere, so there is no hangul, network or date to anchor an entry. Unchanged for several weeks.
- **Gracefully Killing You** (고분고분한 킬러, TVING) — title settled, cast settled (Kim Da-mi, Jo Bo-ah, Jo Ah-ram, Kim Jae-wook, Nam Yoon-soo), still listed under a bare "2027" with no month.
- **Family Matters 2** (가족계획 2, Coupang Play) — still carried as "2026" with no month, and 2026 has seven weeks left. Bae Doo-na, Baek Yoon-shik.

## Known gaps that no source can currently close

With the API down these cannot be re-checked at all this week; the list is carried forward from 2026-11-01.

- **The Second Signal** (두 번째 시그널, tvN, 2026-12-07) — no MyDramaList record under either title, so no episode count and no poster. tvN publicly confirmed the December premiere on 2026-11-06, and Soompi notes it had been set for June before being held over Cho Jin-woong's controversy. It premieres in four weeks and is the one still worth checking every run.
- **Nightmare** (악몽, SBS, 2027-04-09) — the hangul only ever matches unrelated 1968 and 2020 dramas.
- **Love O'Clock** (24분의 1 로맨스) and **Salon de Nabi** (날아올라라 나비).
- **All of Us Are Dead 2** (지금 우리 학교는 2).
- **Happy Anding** (뜨거운 안녕, tvN) — premiered 2026-11-11; has a poster from an earlier run but no record surfaces under its hangul.

### Resolved this run

- **Sword & Silence** was flagged last week because its MyDramaList record sat under the shorter 문무 while the catalog said 대왕문무, and the match rested on the English title and 28-episode count agreeing. DramaWiki's KBS row now spells it 문무 as well, so both sources agree and the catalog's `titleKr` was corrected to match. The flag is cleared.
- **The Great Ok Suk** and **The Congressman Sends My Condolences** swapped tvN slots: Ok Suk moved up from Mar 13 to Jan 16, and the Congressman moved back from Jan 16 to Feb 27. Both rows carry explicit new dates, so this was applied without waiting for a second reading.

### New this run

- **`tools/mdl-slugs.json`** records which MyDramaList record each of 63 catalog entries resolves to. Resolving a slug used to cost a search plus up to six detail reads per title — about a thousand calls a run — and the mapping almost never changes. With the map, a run costs one read per entry. It is also the only surviving record of those identifiers now that the API is offline.
