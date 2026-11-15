# Pending review

Things the weekly ingest found but will not commit on its own: **new catalog entries** and **synopsis text**. Everything else it finds — dates, episode counts, retitles on a hangul match, cast, air labels, poster refreshes — it applies and pushes itself (see `MASTER_SPEC.md` Section 13 and the 2026-10-30 entry in `decisions.md`).

The weekly run rewrites this file: it adds what it finds and removes what has been accepted. To accept an item, say so in the KALENDAR session and it gets committed to the catalog and struck from here.

**Last updated:** 2026-11-15

---

## ⚠ MyDramaList API still offline — week two

`my-drama-list-api-ten.vercel.app` still returns **HTTP 402 `DEPLOYMENT_DISABLED`** on every path. Unchanged, and still a billing shutdown rather than an outage.

Posters already on file keep rendering and the stub screen is clean (68 blobs, 0 stubs). But **the fourteen entries accepted on 2026-11-15 went in without posters**, and none of the long-standing poster gaps can be closed while this is down.

The replacement-source question is still open. Wikipedia is already a named source in Section 13 and would cover episode counts and air dates; it cannot cover posters, because its poster images are fair-use rather than freely licensed. Say the word if you want it scoped.

---

## New titles awaiting review — 0

Nothing held. All fourteen carried here from the 2026-11-15 run were accepted the same day and are in the catalog.

---

## Synopses awaiting review — 0

Nothing held. Seven were accepted and written on 2026-11-15: Crash 2, Sacred Jewel, Nine to Six, Tantara, The Substitute, One-of-a-Kind Romance and Full Count.

**Correction to last week's table:** it listed *Gift* as having no summary. It already had one, written back on 2026-09-10. Nothing was lost — it was a wrong entry in this file, not a gap in the catalog.

---

## Watching, not yet actionable

- **Portraits of Delusion** (현혹, Disney+) — tracked at December 2026; DramaWiki moved it to a bare "2027" on 2026-11-14. **This is the one to settle next run.** It is a first reading, so nothing changed, but if it is real the catalog is advertising a date three weeks out for a show that has slipped a year. Second reading due 2026-11-22.
- **Wild Flowers Bloom in the Palace** (궁에는 개꽃이 산다, MBC) — tracked at May 2027, dropped to a bare "2027" the same week. Also a first reading, also unchanged. Lower stakes than the above.
- **The Wife** (더 와이프, MBC) — Kim Hee-sun and Go Soo. Held at 2027-06 last week, now back to a bare "2027", so it has no month to enter on. Returns to the table when one does.
- **While You're Here** — Kim Hyang-gi and Ahn Dong-gu. DramaWiki still carries no row anywhere; no hangul, network or date. Unchanged for several weeks.
- **Gracefully Killing You** (고분고분한 킬러, TVING) — title and cast settled, still a bare "2027".
- **Family Matters 2** (가족계획 2, Coupang Play) — still "2026" with no month, six weeks of 2026 left.
- **Wi-Fi Love in the Palace** — excluded as a film for three weeks. Soompi now tags it both Film and TV/Film and its copy no longer says which, so the format is unconfirmed rather than settled. Still out, but no longer on firm ground.

## Known gaps that no source can currently close

Cannot be re-checked while the API is down.

- **The Second Signal** (두 번째 시그널, tvN, 2026-12-07) — **premieres in three weeks**, still no episode count and no poster. The most conspicuous gap in the catalog.
- **The fourteen titles accepted on 2026-11-15** — all went in without posters, and all but Wolves in Suits and Unnatural without an episode count.
- **Nightmare** (악몽, SBS), **Love O'Clock** (24분의 1 로맨스), **Salon de Nabi** (날아올라라 나비), **All of Us Are Dead 2** (지금 우리 학교는 2), **Happy Anding** (뜨거운 안녕).

### Resolved on 2026-11-15

- **The Remarried Empress had the wrong release shape**, reported by the user: four episodes on its premiere Wednesday and two each Wednesday after, six out as of Nov 15, where the app was showing a plain weekly grid. Now `airLabel: "Wed"` with `epsPerDrop: 2, firstDrop: 4`, which generates 4/2/2/2 across Nov 4, 11, 18 and 25 and reads 6 of 10 released. **The lesson is that front-loading is not a TVING habit** — this is Disney+, and Section 13 has been corrected to stop treating it as one.
- **Two "poster: yes" claims in this file were wrong.** Wolves in Suits and Unnatural were recorded as having posters from the last good MyDramaList read. Screened on the way into the catalog, both URLs turned out to be the grey "poster not released yet" stub, so neither went in with one. Section 14 now says to screen a URL before recording that a poster exists, not only before writing it.
- **Two air labels recovered without MyDramaList.** One-of-a-Kind Romance is Mon / Tue — from Nov 9, that puts episode 12 on Dec 15, its reported finale date, and Nov 9 is itself a Monday. Full Count is Fri / Sat, reported as a Friday–Saturday series with a Feb 26 2027 premiere that is a Friday. Both also gained crew or premise detail from the same coverage.
- **Doctor X** finished on 2026-11-14 at 15.2% nationwide. Its pattern was pinned down from its own Friday start date, Soompi's Saturday finale report and the 12 episodes on file: Fri / Sat over six weekends is exactly 12 ending Nov 14.
