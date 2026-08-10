# KALENDAR — K-Drama Tracker Master Spec

**Version:** 0.4 (draft)
**Date:** 2026-07-20
**Status:** Living document — maintained by the `chief-developer` agent. Do not treat anything marked as an Open Question (Section 17) as decided.

KALENDAR is a personal companion app for tracking K-dramas — built for watchers who already use MyDramaList (MDL) to plan and catalog shows, but need something better for staying on top of multiple dramas airing at once.

---

## 1. Overview & Positioning vs. MDL

**What MDL does well:** a comprehensive drama catalog, ratings/reviews, and social list-sharing (plan-to-watch, completed, dropped lists that others can see).

**Where MDL is weak, for this app's target user:** tracking *several currently-airing dramas simultaneously* — which episode has aired vs. which the user has actually watched, organized by day of the week. MDL's lists are static status buckets, not a live weekly schedule.

**Positioning:** KALENDAR is a **companion to MDL, not a replacement**. It doesn't try to be a catalog-of-record or a social platform. It picks up specifically where MDL falls short: a swipeable discovery feed for what's about to air, and a weekly watch calendar + accurate watched/aired episode tracking for shows in progress.

**Explicit non-goals:**
- Not a social network (no public profiles, comments, or list-sharing between users)
- Not a catalog-of-record (doesn't aim to have exhaustive historical metadata on every drama ever made — see Section 13 on data sourcing limits)
- Not a review/ratings aggregation site

---

## 2. User Stories / Personas

**Primary persona:** A K-drama watcher who maintains a plan-to-watch and completed list on MDL, but juggles 3–5 currently-airing dramas at a time and regularly loses track of which episode aired this week vs. which they've actually watched.

Stories, one per flow (Sections 4–11):
- As a user, I want to browse upcoming dramas sorted by air date so I can decide what to add to my watchlist before it starts airing.
- As a user, I want to swipe through upcoming dramas quickly to mark interest without deep research up front.
- As a user, I want to tap a drama to see cast/crew/synopsis detail before committing, without leaving the feed.
- As a user, I want a Monday–Sunday calendar showing exactly which drama + episode airs each day, for everything I've marked interested in.
- As a user, I want to mark an episode watched from the calendar and have my currently-watching tiles reflect both what's aired and what I've watched, since those two numbers often differ.
- As a user, I want to rate and annotate dramas once completed, and rank my favorites into a personal Top 10.
- As a user, I want a dropped list separate from completed, without losing the progress I'd made.
- As a user picking up this app after years of watching K-dramas, I want to backfill my viewing history back to 2006 without re-entering everything from scratch by hand.

---

## 3. Information Architecture

**Top-level tabs:** Discover · Calendar · Currently Watching · Completed · Dropped · Import/Settings

**State diagram for a drama, per user:**

```
Discovered → Interested → Currently Watching → Completed
                                              ↘ Dropped
Discovered → Not Interested (left swipe)
```

A drama enters "Currently Watching" automatically once the user has marked it Interested and its air date has arrived.

---

## 4. Discovery Feed

- Sorted by release/air date, ascending.
- **Resolved:** TBA titles are not a separate tab. They're appended as a distinct "Coming Soon — Date TBA" section (sticky header, no date subtext) at the bottom of the same feed, ordered by date-added-to-catalog. Tiles use a "TBA" badge in place of the start-date field; swipe/flip behavior is identical to dated tiles. If a TBA title later gets a confirmed date, it moves into sorted position among dated tiles on the next refresh.
- Each tile shows: title, mini poster, episode count, air days of week, channel/platform, start date.
- Scrolling feed, loads incrementally (infinite scroll or paginated — implementation detail, not decided here).
- Empty state: shown when no upcoming dramas are queued (e.g. curation pipeline lag — see Section 13).

---

## 5. Swipe Interaction

- Swipe right = Interested (adds to plan-to-watch / Currently-Watching-on-air-date pipeline).
- Swipe left = Not Interested.
- **Resolved:** On left swipe, a toast appears ("Not interested — [Title]  Undo", ~4–5s) allowing immediate reversal; after it expires, the drama is set to `not-interested` and drops out of the main feed. The underlying `UserDramaStatus` record is a soft state, not a hard delete (see Section 12).
- **Revised:** a "Your Picks" sub-screen (reachable by tapping the interested-count pill) lists both Interested and Not Interested dramas, each with a one-tap control to move it to the other list. This walks back the earlier "no browsing UI" call — prototype testing showed users need to recover from mis-swipes without waiting out the undo window, so both statuses are browsable and reversible, not just the just-swiped one.
- Non-gesture fallback: explicit buttons for interested/not-interested, for accessibility and non-touch input.
- Undo affordance for the most recent swipe (the toast above).

---

## 6. Tap-to-Flip Card

- Tapping a discovery tile flips it to reveal detail on the back face.
- Back face fields: producer, writer, lead cast, second leads, synopsis.
- This mirrors the kind of summary available per-drama on MDL, but entered/sourced independently — see Section 13 and Section 14 for sourcing constraints.
- **Revised:** the detail is a bottom sheet rather than a card back-face flip, and it is reachable from every screen a drama appears on — a Discovery tile, a Your Picks row, a Calendar episode row, and a Currently Watching tile — not just Discovery. The drama's own controls (mark-watched, the episode slider, the star row, Drop) keep their existing behaviour; the tap-to-open target is everything else on the row/tile.
- A drama with no synopsis on file (nothing sourceable under Section 14's rules, or a manually added entry) says so in the sheet rather than showing an empty summary. Detail fields carry over when an Interested pick is promoted into Currently Watching, so the sheet reads the same before and after promotion.

---

## 7. Weekly Watch Calendar

- Grid layout, Monday through Sunday, in that order.
- Each day cell lists drama title + episode number for everything airing that day, for dramas the user marked Interested.
- Multiple dramas airing the same day are all listed in that day's cell.
- A drama appears on the calendar once it's Interested and its air date has been reached.
- Week-to-week navigation (forward/back).

---

## 8. Episode Tracking & Currently Watching

- "Mark as watched" is triggered from the calendar view, on a per-episode basis.
- **Currently Watching** list tiles track two independent counters:
  - `Watched` — driven by the user marking episodes watched.
  - `Aired` — driven by the actual broadcast schedule, independent of what the user has watched.
- These two counters are expected to diverge (user behind on aired episodes is a normal, supported state, not an error).
- **Resolved:** the two counters are shown as a single consolidated progress bar rather than two separate lines. The bar's full track represents total episode count; the filled portion is teal up to the watched count, then amber from watched through aired (the "behind" gap), with the remainder unfilled. A small legend line stays under the bar in both states, showing the exact `Watched N` / `Aired N` counts. A top-right badge shows status at a glance: "Behind by N" (amber) when the user has unwatched aired episodes, or "Caught up" (green/success) when watched has reached aired, with the total episode count displayed beneath it. This replaces the old two-bar layout, which repeated the "of Y" total on both rows.
- **Resolved:** the 1–10 rating (see Section 9) is not gated behind completion — a lightweight rating control lives on every Currently Watching tile, editable anytime while a drama is still airing. This carries forward as the drama's initial rating when it completes, rather than asking the user to rate from scratch at the end.
- **Resolved:** there is no separate "mark as completed" step. The moment a user marks the last aired episode of a drama watched (from either the Calendar or Currently Watching view), the drama moves to Completed automatically, carrying over whatever rating was already set. A prompt opens immediately afterward for notes (and a final rating tweak if desired) — this is a convenience for capturing thoughts in the moment, not a gate; closing it without saving still leaves the drama completed.

---

## 9. Completed List

- Rating scale: 1–10 (see Section 8 — set anytime while airing, not just at completion).
- Free-text notes field per completed drama (why the user liked/disliked it). Prompted automatically right when a drama completes (Section 8), editable anytime after.
- Personal Top 10 ranking, reorderable via long-press-and-drag.
- **Resolved:** completing/rating an 11th drama does not force a comparison prompt. It's added to Completed as normal and appears in a "Not Ranked" tray below rank 10 (no rank number). The user can drag it up into the ranked region at any time; dropping it at position N shifts ranks N–10 down, and whatever falls to position 11 automatically moves to the Not Ranked tray (kept, not deleted — rating/notes retained). A non-gesture "Set Rank" picker (1–10 or Not Ranked) covers accessibility. No forced-comparison modal.
- **Resolved:** the Not Ranked tray sorts most-recently-completed first, so whatever the user just finished surfaces at the top rather than requiring a scroll through history. A search box on the Completed/Dropped screen lets the user jump to a specific title directly once the list grows long, independent of sort order.

---

## 10. Dropped List

- Distinct from simply deleting/removing a drama from tracking — a Dropped drama retains history.
- Partial watch progress (episodes watched before dropping) is retained and displayed.
- Re-activation path: a Dropped drama can be moved back to Currently Watching.

---

## 11. Historical Import / Backfill (2006–present)

Three supported import paths, none of which involve scraping mydramalist.com:

1. **Manual entry UI** — user enters a completed drama's details by hand.
2. **CSV/text paste import** — user pastes a structured list (e.g. exported from their own records).
3. **User copy-paste of their own MDL profile data** — the user views and copies data from their own MDL account (data they have a right to access as their own account's content); the app does not automate retrieval of this.

Validation/dedup strategy for bulk backfill (matching pasted/entered titles against the app's known drama catalog) is an implementation detail to work out during UI/UX design, not fixed here.

---

## 12. Data Model Outline

Entities and key fields only — not a schema/DDL.

- **`Drama`** — title, poster, episode count, air days, channel, start date, synopsis, cast, crew, status (upcoming / airing / ended)
- **`UserDramaStatus`** — user ↔ drama, state enum (interested / currently-watching / completed / dropped / not-interested), timestamps
- **`Episode`** — drama reference, episode number, air date
- **`EpisodeWatchRecord`** — user, episode reference, watched (boolean), watched date
- **`CompletedRating`** — user, drama, rating (1–10), notes, top-10 rank (nullable)
- **`ImportBatch` / `ImportRecord`** — source type, raw input, parsed status (audit trail for backfill imports)

---

## 13. Data Sourcing Strategy

**Upcoming/currently-airing drama data (revised 2026-07-31):** four active sources, each used for what it's actually good for:
- **DramaWiki** (`wiki.d-addicts.com/Upcoming_KDrama`) — structured facts only: title (EN + KR), network, air date/TBA, cast. DramaWiki's own copyright page explicitly disclaims GFDL/open licensing, so its prose (per-drama write-ups) is never read into the app — index-page facts only.
- **Soompi RSS** (`soompi.com/feed`) — discovery signal (what's newly being announced/talked about) and attributed news context; filterable to drama content via its own `<category>` tags.
- **The unofficial MyDramaList scraper API** (`my-drama-list-api-ten.vercel.app` — see decisions.md 2026-07-31 for the full reversal of the earlier decline) — the richest structured source: its `/api/id/{slug}` endpoint returns episode count, air date range, air days, original network, genres, and a poster image URL (hotlink-only, per the existing image policy) in one record; `/api/calendar` and `/api/search` support discovery. **Its `synopsis` field is MDL's own authored prose (the API's own responses include an explicit "(Source: ... at MyDramaList)" attribution) — this is never copied into KALENDAR, verbatim or paraphrased.** Adopting this API is about structured data *access*; it does not relax the existing no-verbatim-MDL-text rule below.
- **Wikipedia** — CC BY-SA, genuinely reusable with attribution. Once an article exists for a title (typically once it airs or nears premiere, not at first announcement), its infobox and opening description are a real, better-licensed synopsis source than any of the above.

**Synopsis-text sourcing priority specifically (revised 2026-08-10 — paraphrase now permitted, see decisions.md):** (1) Netflix's newsroom (`about.netflix.com/en/newsroom`) when it's a Netflix Original — real official English prose, but Netflix has no public API, so this is occasional manual/session reading, not an automated pull; (2) Wikipedia's CC BY-SA text, once an article exists; (3) **an original paraphrase of a premise described by MDL, DramaWiki, or press coverage (Soompi, Dramabeans, trade press, network/streamer publicity)** — the underlying premise of a drama is a fact about it and is not owned by whoever wrote it up, so it may be restated in KALENDAR's own words; (4) leave the field blank/TBA when nothing describes the title yet.

**What "paraphrase" means here, since the line matters:** read the source, then write the premise fresh — new sentence structure, new word choices, KALENDAR's own one-or-two-sentence tile voice. Copying a sentence and swapping a few words is verbatim reuse wearing a hat, and is still banned by Section 14. Distinctive turns of phrase, coined nicknames, and the reviewer's own judgments belong to the source and don't come across; who does what to whom, and what the show is about, do.

**r/KDrama (Reddit) is parked, not actively used.** As of 2026, Reddit's API requires a manual approval ticket under Reddit's Responsible Builder Policy rather than self-service registration, and Reddit content isn't fetchable in a Claude session either (tool-level restriction). It remains usable only as a manual fallback if the user personally copy-pastes Reddit content into a session — not a first-class pull source.

**Not adopted as named sources (parked — see Section 17):** direct scraping of Korean broadcaster schedule pages (SBS, MBC, KBS, tvN, ENA) or Netflix's own site raises the same "unauthorized automated extraction" shape of concern already flagged for MDL, and none of these have had per-site ToS reviewed. Not ruled in or out.

**Resolved (cadence, revised 2026-07-31):** ~~fully manual for v1~~ — automated via a **recurring scheduled Claude Code task** (cadence set at the scheduling tool's own setup, not fixed in this spec). On its schedule, the task fetches all active sources above, cross-references against the app's existing drama data to avoid duplicates, and drafts normalized `Drama`/`Episode` entries. **This is scheduled, cron-driven automation of the pull + draft step — not a passive background service**, since the app has no backend to run one on (see Section 15 on architecture); it is Claude Code's own scheduling capability standing in for that missing backend.

Two distinct gates remain, not one: (1) a lightweight data-quality check — the drafted batch is shown to the user before anything touches the live app, catching obviously wrong/duplicate/malformed pulls, not a preference judgment; (2) the actual interested/not-interested decision, which happens exactly like it always has — once a candidate is a live Discover tile, the existing swipe-right/swipe-left gesture **is** that decision. No separate curator/admin screen exists or is planned; gate (2) is just the ordinary Discover UI.

**Historical/completed-drama data (2006–present):** user-driven only (see Section 11) — this is a separate concern from the upcoming/currently-airing sourcing above, and is unaffected by the MDL walk-back in Section 14. Where a user pastes their own MDL profile data, this is framed as the user exercising their own right to their own account's data.

**Promotional posters (feeds Section 14):** the airing channel/platform itself — Netflix, SBS, MBC, KBS, tVN, and other broadcasters/streamers — releases official promotional posters for publicity as part of a drama's announcement. r/KDrama and Soompi are typically where these first become visible during curation, but the *channel* is the origin of the image, not Reddit or Soompi. During the same manual curation step that reviews upcoming-drama candidates, the curator should trace a spotted promo poster back to the channel's own official account/page (e.g. the streamer's title page, or the network's official social media) as the source to use, rather than treating the Reddit/Soompi post itself as the source. See Section 14 for the sourcing hierarchy this feeds into.

---

## 14. Copyright / ToS Guardrails

**Explicit do-not-build list:**
- ~~No scraping or automated import from mydramalist.com, in any form~~ — **walked back 2026-07-31** (see decisions.md): the unofficial MDL scraper API is now used for structured upcoming/airing data, under the standing conditions below. This reversal does not touch the next rule.
- No verbatim republishing of MDL-authored (or DramaWiki-authored) synopsis text or other prose content, ever. ~~Not paraphrased either~~ — **the paraphrase half of this rule was walked back 2026-08-10 at the user's direction** (see decisions.md): a drama's premise may be restated in KALENDAR's own words from any of those sources. The verbatim ban is unchanged and is the whole of what remains: never copy a sentence, and never lightly reword one and call it new. Structured facts (title, episode count, air dates, network, cast, genre) were always fine to pull from either source.
- Attribution required for any content sourced from Soompi, DramaWiki, Wikipedia, or MDL. (Reddit is parked as a source — see Section 13 — but the same attribution requirement applies if the user manually pastes Reddit content into a session.)
- **Flagged, not fully resolved:** DramaWiki's site-wide content-reuse license hasn't been explicitly confirmed as an open license — its own copyright page disclaims GFDL and warns against duplicating its content, which reads closer to standard copyright than a permissive wiki license. Attribution is required regardless; this is a reason for caution on prose (already banned above), not a reason to avoid its structured facts.
- **Standing condition on the MDL walk-back specifically:** adopted now for personal/single-user/prototype use only. Must be reassessed before any public, multi-user hosting/release — using someone else's unauthorized scraper to serve other people's requests is a materially different exposure than using it for one person's own use. This mirrors the existing poster-hotlinking caveat below, and both now hinge on the same "personal use only, revisit before distribution" condition.

**Resolved, with risk explicitly acknowledged (this was flagged as a hard blocker by feature-skeptic — no option here is a fully clean, licensed answer, so the decision below is a deliberate risk-accepted posture, not a "solved" problem):**

- **Primary source: official promotional posters released by the drama's airing channel/platform** — Netflix, SBS, MBC, KBS, tVN, and other broadcasters/streamers routinely release these for publicity when a drama is announced. This is genuinely publicity material the channel intends to circulate, which meaningfully strengthens the risk posture compared to generic "poster art" — but it is still the channel's copyrighted material, not a license grant to a third-party app, so the sourcing mechanics below still matter.
  - **Discovery vs. source are different things.** r/KDrama and Soompi are typically where a new promo poster first becomes visible during curation, but they are not the source — the channel is. During curation, trace the poster back to the channel's own official account/page (streamer title page, network's official social media/press page) and hotlink from there when it can be found.
  - **If the original channel source can't be located,** the Reddit/Soompi-hosted copy is an acceptable fallback *specifically because the underlying image still originates from the channel*, not from a fan/third party — but it's a step down in provenance clarity, so prefer the traced original whenever curation time allows.
  - **Corrected 2026-07-31 — hotlinking is not actually possible:** the original rule here said "hotlink only, never download and rehost." That's no longer the mechanism, for a discovered technical reason, not a change of heart: Claude Artifacts run under a strict CSP that blocks the page from loading remote images from external hosts at all — a hotlinked `<img>`/`background-image` to i.mydramalist.com or any other outside domain simply doesn't render in the published artifact (confirmed directly: it worked in a local, non-sandboxed test and then failed once actually published). The only way to display a poster image in this app at all is to embed it — fetch the bytes once, store as a base64 `data:` URI, same as the app's original demo posters always did. **The sourcing hierarchy above is unchanged** (official channel source first, traced Reddit/Soompi copy as fallback, never a fan-art substitute) — only the delivery mechanism changed, from "link to it" to "embed a copy of it," because linking to it doesn't work here.
- **Fallback (for titles with no promo poster yet, e.g. earliest TBA announcements):** user-uploaded images. Lowest technical-infringement exposure for a personal, single-user app (the user, not the app, is responsible for what they upload), and fits the app's actual scale — it isn't trying to have a poster for every title on day one.
- **Standing caveat:** this posture is acceptable specifically because KALENDAR is a personal, single-user, non-distributed app, and because promotional posters are material the channel itself intends to circulate publicly. If the app is ever shared, demoed publicly, or distributed beyond personal use, this decision must be revisited — the risk calculus changes substantially.

---

## 15. Technical Direction

Future build target: **React Native / Expo**, for a single cross-platform (iOS + Android) codebase. This is documented here only as directional context for future work — no scaffolding, code, or technical architecture is part of this spec deliverable.

---

## 16. Non-Functional Notes

- **Offline behavior — resolved: deferred past v1.** Not a stated pain point for this single-user app, and a full offline-first sync layer is real engineering lift. If built later, the lightweight version is: cache last-synced calendar/currently-watching state read-only; writes (marking watched) sync on reconnect — not a general offline-first engine.
- **Historical backfill performance — resolved: not a real risk at this scale.** A single user's watch history tops out at low hundreds of entries, not "big data." Target: CSV/paste import handles a few hundred rows without UI freeze or silent failure, with visible per-row parse status (already supported by the `ImportRecord` audit trail in Section 12). No further performance work needed beyond that.
- **Push notifications ("episode airing today") — resolved: deferred past v1.** The weekly calendar is already a pull-based surface that solves the core problem (losing track of what's aired vs. watched); a notification is an accelerant on top of that differentiation, not what creates it. Revisit post-v1 once the calendar/tracking core is validated. If built, the lightweight version is a single daily digest ("3 episodes airing today"), not per-episode/per-show push preferences.

---

## 17. Open Questions / Parking Lot

All six items from the first team review round (TBA placement, swipe recoverability, Top 10 mechanic, poster sourcing, ingestion cadence, non-functional scope) are resolved — see Sections 4, 5, 9, 13, 14, and 16, and `docs/spec/decisions.md` for the full reasoning behind each. Two small sub-decisions were deliberately left for build time rather than blocking spec closure:

- Exact "not interested" undo-toast duration (4s vs. 5s) — Section 5
- Whether the undo toast should also appear for the non-gesture accessibility-button path, identically to the swipe-gesture path — Section 5

Added 2026-07-31:
- Whether direct scraping of Korean broadcaster (SBS/MBC/KBS/tvN/ENA) or Netflix schedule/press pages should ever be adopted as a named pull source — not ruled in or out; needs per-site ToS review before any commitment. See Section 13.
- **Public, multi-user hosting is a confirmed future direction, not a v1 target** — KALENDAR is not intended to live in a Claude Artifact indefinitely, but this is a distinct, separately-scoped future initiative (real backend, accounts, likely a full architecture rework — see Section 15) and is not being architected now. Everything in Section 14 that's currently risk-accepted on a "personal, single-user, non-distributed" basis (MDL scraper use, poster hotlinking) must be explicitly revisited when this is picked up.

Added 2026-08-01:
- **App name ("KALENDAR") is provisional, not cleared for public use.** It duplicates the exact name of at least two unrelated existing apps (a French and a Greek scheduling app on Google Play) and trades on a generic word plus a common stylized spelling. No legal exposure exists while the app remains private/single-user, but a real naming/trademark-clearance pass is required before any public listing or distribution — do not assume the current name carries forward to a published release. (growth-marketing-lead review, see `docs/spec/decisions.md`.)

New open questions should be added here as they come up in future team reviews.

---

## 18. Glossary

- **TBA** — "to be announced"; a drama with no confirmed air date yet.
- **Second lead** — a supporting romantic-interest role, distinct from the male/female lead; a recurring K-drama structural convention worth surfacing in the flip-card detail view.
- **Currently Watching** — dramas the user is actively watching, i.e. Interested + air date reached, not yet Completed or Dropped.
- **Top 10** — the user's personal ranked list of favorite Completed dramas.
- **Backfill** — the process of importing/entering historical watch data predating the user's use of this app.
