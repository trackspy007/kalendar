# KALENDAR — Decision Log

Running log of synthesized team decisions, maintained by the `chief-developer` agent. Newest entry on top. Each entry: date, topic, Advocate's case, Skeptic's case, Chief Developer's recommendation + rationale, outcome.

---

## 2026-08-10 — Paraphrased synopses allowed; every drama in the app now has one (user decision, not a full advocate/skeptic round)

**Context:** wiring the detail sheet into Calendar and Watching (entry below) exposed that the seven seeded Watching dramas and eight Discovery entries had no synopsis at all, because Section 13's old rule allowed only Netflix newsroom prose or a Wikipedia article and otherwise required the field be left blank — "not even paraphrased" from MDL or DramaWiki. The user directed that the rule be relaxed so those shows get summaries.

**What changed in the rules:** a drama's *premise* is a fact about the drama, not the property of whoever wrote it up first, so it may now be restated in KALENDAR's own words from MDL, DramaWiki, or press coverage. The verbatim ban is untouched and is now the entire rule: no copied sentences, and no lightly-reworded ones either — that is verbatim reuse in disguise, not paraphrase. Distinctive phrasings, coined nicknames, and a reviewer's own judgments stay with the source. Sections 13 and 14 both updated; the earlier "leave it blank/TBA" outcome survives only as the last resort when nothing describes a title yet.

**What was written:** fifteen summaries — the seven Currently Watching seeds plus the eight Discovery entries that had an empty field. Each was researched first (Wikipedia, AsianWiki, Soompi, Dramabeans, MDL, network/streamer pages, trade press) and then written fresh in the one-to-two-sentence tile voice the existing entries already use. Nothing was invented: a title with no findable premise would have kept its blank field and the sheet's "no summary on file" line, which is still the behaviour for anything added later without a source.

**Note for whoever picks this up next:** writer/director are still blank for most of these, so the sheet reads "Not yet announced" even for shows that have been airing for weeks. That's now the most visible remaining gap in the detail sheet — worth a pass with the same sourcing rules, since crew credits are structured facts and were never restricted in the first place.

**Outcome:** Adopted. Spec updated — Sections 13 and 14.

---

## 2026-08-10 — Drama detail sheet reachable from Calendar and Watching (direct user request, not a full advocate/skeptic round)

**Context:** the user asked for the Discovery tap-to-see-the-summary behaviour on the Calendar's episode rows and the Currently Watching tiles as well. A direct feature request with no sourcing, licensing, or positioning question attached, so it was implemented rather than routed through a specialist round.

**What was built:** the existing detail bottom sheet (Section 6) is now opened from a Calendar episode row and from a Watching tile, in addition to Discovery tiles and Your Picks rows. Each tile's own controls are excluded from the tap target — mark/unmark on the Calendar row, and the episode slider, star row, Mark-Ep and Drop buttons on the Watching tile — so no existing gesture changes meaning. Keyboard parity: the Calendar row is itself the focusable control; on the Watching tile the title is, since a tile containing a slider and several buttons can't be one control.

**Two data gaps surfaced while wiring it up:**
- Detail lookup searched only the Discovery list, but a promoted pick is spliced out of that list — exactly the dramas Calendar and Watching show. Lookup now spans both lists.
- Promotion dropped `synopsis` / `writer` / `director` / `dateLabel`, so a drama's sheet went blank the moment it moved into Watching. Those now ride along through promotion and through the localStorage round-trip.

Seeded Watching dramas still have no synopsis text, and none was invented for them — Section 14's sourcing rules say leave it blank rather than paraphrase MDL/DramaWiki prose. The sheet now says "No summary on file for this one yet." instead of rendering an empty paragraph.

**Outcome:** Adopted. Spec updated — Section 6.

---

## 2026-08-01 — App name "KALENDAR" reviewed: keep for now, flagged provisional (not a full advocate/skeptic round)

**Context:** the user asked directly about copyright/trademark exposure on the name "KALENDAR" and whether similar K-drama tracking apps already exist, then asked for the growth-marketing-lead specialist's opinion specifically on naming and positioning. Prior research this session (web search, not this agent) found: at least two unrelated existing apps already named "Kalendar" (a French and a Greek scheduling app, both on Google Play, neither K-drama-related); no confirmed U.S. trademark registration found for "KALENDAR" in software; and a real competitive field — MyDramaList (incumbent), K-Drama Trackr, KDramaTracker, and Drama Track as close feature-alike trackers, plus general cross-media trackers (SIMKL, Trakt, Kitsu, AniList) people also use for K-dramas.

**growth-marketing-lead (only specialist consulted — a naming/positioning question, not a scope change, so the full advocate/skeptic/UI-UX round wasn't needed):**
- The name isn't a *legal* problem today — trademark law requires commercial use causing confusion, and a private, undistributed artifact has none. It's a *future discoverability* problem: publishing under "Kalendar" later means competing in app-store search against two identically-named unrelated apps plus the generic word "Calendar" itself, with real risk of a naming/trademark objection at that point regardless of formal registration status.
- Differentiation, if this is ever positioned publicly: the one genuine, defensible gap versus MDL and the closest competitors is the calendar-native Watched-vs-Aired tracking already stated in Section 1 — those apps are watchlist/status trackers, not calendar-first. Auto-promote-on-air-date, the swipe-to-undo gesture, and the 20-year personal backfill were each considered and rejected as marketing hooks (respectively: invisible in a store listing, table-stakes gesture polish most competitors already have some version of, and a personal story rather than a repeatable claim for other users).
- The competitor's regional App Store unavailability (user hit this directly while testing) is real but not an "advantage" to claim — a private, non-distributed tool simply isn't subject to app-store distribution mechanics at all, which is incidental, not earned.

**Recommendation:** Keep "KALENDAR" for continued personal use — renaming now costs nothing functionally but also fixes nothing, since there's no live exposure to protect against. Do not treat the name as finalized; log it as provisional so a real naming/trademark-clearance pass happens before any public release, rather than letting months of use as the working name read as "already cleared." No change to Section 1's positioning — it already states the correct differentiator without needing the other candidates folded in as if they were market-facing hooks.

**Outcome:** Adopted. Spec updated — Section 17 (new provisional-name open question, dated 2026-08-01). No change to Section 1. User separately asked for alternative name brainstorm as a follow-up — not part of this recommendation, handled directly in-session, not spec-tracked.

---

## 2026-07-31 — Poster hotlinking is technically impossible; corrected to embedded images; live calendar date and demo-data reset shipped

**Context:** while adding real posters for the newly-verified/added Discover titles (via the just-adopted MDL scraper — see the sourcing entry immediately below), hotlinked poster URLs were used per the existing Section 14 rule ("hotlink only, never download and rehost"), and tested successfully in a local, non-sandboxed test page. Once actually published to the live Claude Artifact, the user reported the posters weren't showing. Investigation confirmed the cause: Claude Artifacts run under a strict Content-Security-Policy that blocks the page from loading remote resources from external hosts, including images — a hotlinked `background-image` to an outside domain cannot render inside the published artifact, full stop. This directly contradicts the mechanism (not just the spirit) of the existing hotlink-only rule, which was written without knowledge of this platform constraint.
**Resolution:** the sourcing *hierarchy* in Section 14 is unchanged — official channel source first, traced Reddit/Soompi copy as fallback, user-upload as last resort, never generic fan art. Only the *delivery mechanism* changed: since linking doesn't work, images are now fetched once and embedded as base64 `data:` URIs, exactly like the app's original demo posters already did. All 17 posters added this session were re-embedded this way (fetched via a local script, encoded, and inlined into `POSTER_DATA`) and confirmed rendering after republish.
**Secondary issue caught and fixed in the same pass:** the embedding script's first run corrupted the file's text encoding (a PowerShell `Get-Content`/`Set-Content` round-trip misread UTF-8 multi-byte characters — em dashes, middots — as Windows-1252, then re-saved the mangled result). This was caught before it shipped broadly, reversed with a corrected encoding round-trip, and verified clean (zero mojibake sequences remaining) before publishing.
**Also shipped this pass (see prior 2026-07-31 entry's Section 13/14 changes for the sourcing side of this work):** `TODAY` changed from the hardcoded `d(2026, 7, 29)` to a live `new Date()`, and the fictional demo `airing` array (7 hand-authored "Currently Watching" dramas, pinned to that same fixed snapshot date) was cleared to empty — the Watching tab now starts genuinely empty and only populates from real usage (marking an actual Discover title interested, then it airing), rather than showing invented dramas that would otherwise silently become "already aired months ago" the moment the calendar started tracking real time.
**Outcome:** Adopted. Spec updated — Section 14's poster-sourcing sub-bullet corrected in place (marked as a mechanism correction, not a policy reversal). No further action needed; both fixes are live in the published artifact.

---

## 2026-07-31 — Discover-feed sourcing overhaul: DramaWiki + unofficial MDL scraper adopted, scheduled Claude-assisted ingest replaces manual cadence, live calendar date

**Context:** the user asked directly how to pull new candidates into the Discover feed. Hands-on research this session confirmed: Reddit is dead as a pull source (2026 API lockdown requiring manual approval, plus a tool-level fetch block on reddit.com — r/KDrama, named as a source since 2026-07-20, is dead in practice); DramaWiki (`wiki.d-addicts.com/Upcoming_KDrama`, confirmed by the user as the correct site) is a live, genuinely structured index (network/title/date/cast) but explicitly not openly licensed; Wikipedia articles (once they exist) are CC BY-SA and a real synopsis source; the unofficial MyDramaList scraper API (`my-drama-list-api-ten.vercel.app`) is live, documented, and was verified end-to-end this session (`/api/health`, `/api/search/q/{param}`, `/api/id/{param}`, `/api/calendar` all returned real data) — its details endpoint returns episode count, air date range, network, genres, and poster URL in one record, with a `synopsis` field that is explicitly MDL's own authored prose. Separately, the user confirmed by checking their own MDL account that the official API is listed only as "work in progress," not live.

An initial proposal (on-demand, ask-Claude-to-check ingest; MDL left hard-blocked; hosting not discussed) was presented and **rejected by the user directly**, who reframed the ask on three fronts: (1) refresh must happen on a schedule, not manual prompting; (2) the long-term direction is public multi-user hosting, not staying in a Claude Artifact forever, though this specific initiative stays scoped to "for now, on the artifact"; (3) disagreement with hard-blocking the unofficial MDL scraper. The user also independently caught a fourth, previously-unaddressed issue: `TODAY` in the live artifact is a hardcoded constant (`d(2026, 7, 29)`), not the real date — the calendar has never actually tracked wall-clock time.

**Advocate:** DramaWiki + the unofficial MDL scraper together are a categorical upgrade over the old Reddit+Soompi-prose pipeline — real episode counts, air dates, cast, and genre in structured form, not just prose to hand-parse. A scheduled Claude Code task delivers real "automate the pull step" (flagged as the next iteration back on 2026-07-20) without any new backend, since the fetch happens session-side, never inside the CORS-restricted browser artifact. The official MDL API being confirmed dead (by the user's own account check, not just assumption) meaningfully strengthens the case for the unofficial scraper as the only realistic MDL-data path available.

**Skeptic:** Reversing the 2026-07-30 MDL-scraper decline is a real reversal, not a refinement — it should be logged as one, not quietly folded in. The unofficial scraper has no uptime/ToS guarantee and is, definitionally, unauthorized automated extraction from MDL; adopting it is a deliberate risk-accepted posture, not a resolved one, and critically, **it is a different risk once other people are using an app built on it, versus one person using it personally** — the standing condition (revisit before public hosting) has to be explicit and prominent, not a footnote. DramaWiki's own copyright page disclaims GFDL and warns against duplicating its content — closer to standard copyright than an open wiki license — so only structured facts get used, never its prose, and the same rule extends to MDL's `synopsis` field, which the API's own responses explicitly attribute as MDL-authored. Broadcaster-site scraping (SBS/MBC/KBS/tvN/ENA) stays unadopted — same risk shape as MDL, unconfirmed rather than proven, not worth researching further right now per the user's own call.

**UI/UX:** candidates land directly in the normal Discover feed as ordinary tiles — the existing swipe gesture is the approve/reject step, no new screen. A lightweight pre-publish sanity check (the drafted batch shown to the user before touching the live artifact) is a separate, narrower gate — data quality, not preference — and doesn't conflict with keeping the swipe as the real decision point.

**Recommendation:**
1. Adopt DramaWiki (facts only) and the unofficial MDL scraper (structured fields; never its `synopsis`) as active sources, alongside Soompi RSS (discovery/attribution) and Wikipedia (CC BY-SA synopsis once an article exists). Synopsis-text priority: Netflix newsroom (Netflix Originals only) → Wikipedia CC BY-SA → blank/TBA. Never DramaWiki's or MDL's own prose, verbatim or paraphrased.
2. Demote Reddit to manual-fallback-only (user-pasted content) — confirmed dead as both an automated and a session-fetchable source.
3. Replace "fully manual" cadence with a recurring scheduled Claude Code task (exact cadence chosen at scheduling-tool setup) that fetches, cross-references, and drafts candidates; a human still reviews the draft before publish, and the ordinary Discover swipe remains the real interested/not-interested decision.
4. **Reverse the 2026-07-30 decline of the unofficial MDL scraper API**, adopted now for personal/single-user/prototype use, with an explicit standing condition to reassess before any public, multi-user hosting — mirroring the existing poster-hotlinking risk-accepted-if-personal posture.
5. Broadcaster-site scraping (SBS/MBC/KBS/tvN/ENA/Netflix): left as an open question, not researched further, not ruled in or out, per the user's explicit choice.
6. Public multi-user hosting: confirmed as a real future direction, explicitly *not* architected now — logged as a distinct open item (Section 17) so it isn't lost, without scoping it into this change.
7. Separately: `TODAY` being a hardcoded constant rather than `new Date()` is a confirmed bug, not a proposal — the calendar has never tracked real time. Fix is trivial (one line), but is entangled with the hand-authored demo seed data (7 `airing` dramas, Discover `upcoming`/`tba` arrays) all being anchored to that same fixed date; flipping `TODAY` live without also refreshing the seed data just trades a frozen calendar for one showing dramas that finished airing long ago. Sequenced last, after a real ingest pass populates genuine current data to replace the fictional seed.

**Outcome:** Adopted. Spec updated — Sections 13, 14, 17. Reddit removed from active sourcing (parked). Unofficial MDL scraper decision from 2026-07-30 explicitly reversed, with standing revisit-before-hosting condition. `TODAY`/seed-data fix scheduled as an execution step, sequenced after the first real ingest pass.

---

## 2026-07-31 — Rating goes live while airing; completion becomes automatic; Not Ranked gets sort + search

**Context:** direct user feedback on the Watching/Finale flow — wanted to rate a drama during its run rather than only at the end, wanted the notes prompt to fire the instant the last episode is marked watched rather than requiring a separate "mark as completed" step, and asked how the Not Ranked tray would stay usable as it grows.
**Decision (Chief Developer — direct implementation, not a new advocate/skeptic round; this refines existing Section 8/9 behavior rather than opening a new scope question):**
- Rating (1–10) moved from "completion-only" to always-available on any Currently Watching tile, carrying forward into Completed rather than starting blank.
- The "Mark as completed" button/gate was removed entirely. Marking the last aired episode watched now completes the drama automatically (using whatever rating was already set) and immediately opens a notes prompt — a convenience for capturing thoughts in the moment, not a blocking gate.
- Not Ranked tray now sorts most-recently-completed first; added a search box to the Completed/Dropped screen for direct lookup regardless of list length or sort order.
**Outcome:** Adopted. Spec updated — Sections 8 and 9.

## 2026-07-30 — Declined: third-party unofficial MDL scraper-as-API

**Context:** with the official MDL API unreachable (see entry below), user surfaced an unofficial third-party scraper (my-drama-list-api-ten.vercel.app) re-exposing mydramalist.com data as an API, and asked about using it instead.
**Decision (Chief Developer — no new debate needed, this is squarely covered by the existing Section 14 hard-blocker, not a new proposal):** declined. Routing through someone else's scraper doesn't change what's actually happening — it's still unauthorized automated extraction of MDL's data, just with an extra hop, and this is exactly the "disguised variant" the do-not-build list already named. Also adds reliability/provenance risk on top (no affiliation with MDL, no uptime contract, likely itself violating MDL's ToS).
**Outcome:** Rejected. No change to sourcing strategy — r/KDrama + Soompi curation and user-driven historical entry/import remain the plan; official MDL API stays parked pending live-access verification.

---

## 2026-07-30 — MDL-API investigation: real but currently unreachable (status: open, needs user verification)

**Context:** user pointed to https://mydramalist.github.io/MDL-API/ and asked whether it can be used to pull upcoming/historical drama data, which would bear directly on the Section 13/14 no-scraping-MDL guardrail.
**Findings (Chief Developer, direct research — not a full advocate/skeptic round, since this is fact-finding, not a scope decision yet):**
- The docs live under the GitHub org `MyDramaList` (exact brand match), documenting `https://api.mydramalist.com/v1/` — MDL's own domain, not a third party's — with OAuth2 + API key auth and first-person "our API" framing.
- Several *other* community repos explicitly self-label "Unofficial MyDramaList REST API," implying this one is understood as the real one by contrast.
- However, the live endpoint currently returns a Cloudflare bot-challenge (HTTP 403), not an API response; the docs' developer-portal link is an unfilled placeholder; no rate limits or terms of use were ever published. Reads as a real program that was built and then not opened publicly, or wound down.
- Did not attempt to script past the Cloudflare challenge — that would cross from "using a documented API" into anti-bot circumvention regardless of the API's legitimate origin, which is out of bounds independent of this specific case.
**Recommendation:** not a "yes, build against this" or "no, forget it" yet — status is open pending the user checking their own MDL account for a live developer/API section, or contacting MDL directly. If a real key is issued, this would be a clean, sanctioned replacement for the manual r/KDrama + Soompi curation pipeline for upcoming-drama data (Section 13). If dead, no change to the current approach.
**Outcome:** Parked, not adopted or rejected. Revisit once the user has a definitive answer on live access.

---

## 2026-07-29 — Not Interested list becomes browsable (walk-back of toast-only decision)

**Context:** while iterating on the interaction prototype, testing surfaced that users want to reconsider a "not interested" swipe well after the undo toast expires, not just in the first ~5 seconds — and separately, want to see everything they've marked "interested" but that isn't airing yet, in one place.
**Chief Developer synthesis (no new advocate/skeptic round — this responds to direct usability feedback from the prototype, not a new proposal):** added a "Your Picks" sub-screen off the Discovery Feed (tap the interested-count pill) listing both Interested and Not Interested dramas, each swappable to the other list with one tap. This directly walks back the earlier Section 5 call that "no dedicated not-interested archive screen" would be built for v1 — the data was always non-destructive (soft state, see Section 12), so this just exposes UI for something the model already supported.
**Outcome:** Adopted. Spec updated — Section 5.

---

## 2026-07-20 — Poster sourcing refinement: promotional posters originate from the airing channel

**User input:** promotional posters aren't random fan/Reddit content — they're released by the drama's actual airing channel (Netflix, SBS, MBC, KBS, tVN, etc.) for publicity, and r/KDrama is simply where they're typically first spotted, not where they originate.
**Chief Developer synthesis (no new advocate/skeptic round needed — this refines rather than reopens the prior hard-blocker decision):** this clarification strengthens the existing "official source" bucket rather than blurring it with the Reddit-fallback bucket. Updated the sourcing hierarchy: during curation, trace a spotted promo poster back to the channel's own official account/page and hotlink from there when findable; if the original can't be located, hotlinking the Reddit/Soompi-hosted copy remains an acceptable fallback specifically because the image content still originates from the channel, not a fan — but it's lower provenance clarity, so prefer the traced original. The hotlink-only/never-rehost rule from the original decision is unchanged and still applies to both paths.
**Outcome:** Adopted. Spec updated — Sections 13 and 14.

---

## 2026-07-20 — Poster image sourcing for the Discovery Feed

**Advocate:** Piggyback on the existing r/KDrama/Soompi curation pipeline — capture official press images when available, fall back to attributed images from that same post, no extra sourcing effort needed.
**Skeptic:** Hard blocker. No option is fully clean — official images need genuine licensing/fair-use basis, Reddit/Soompi-linked images are one hop removed from the same problem MDL-scraping was ruled out for, user uploads shift liability but aren't risk-free either. Recommended hotlink-only (never rehost) if Reddit/Soompi images are used at all, with the risk explicitly written into the spec rather than left implicit.
**Marketing:** User-uploaded fits a single-user personal app's actual scale better than chasing full poster coverage; official/press images give the best polish when available; skip building Reddit/Soompi image handling as a first-class path unless it's essentially free.
**Recommendation:** Official/press images primary, user-uploaded fallback. Reddit/Soompi-sourced images are explicitly *not* a first-class path — hotlink-only if used at all, never downloaded/rehosted, and ranked below user-uploaded. This is a risk-accepted posture valid specifically because the app is personal/single-user/non-distributed; revisit if that ever changes.
**Outcome:** Adopted. Spec updated — Section 14.

---

## 2026-07-20 — Soompi/Reddit ingestion cadence

**Advocate:** Automate the pull step only (RSS/API fetch into a staging queue), keep normalization and publish manual — removes the "remember to go check two platforms" burden without building auto-normalization.
**Skeptic:** Soft concern. Fully manual is the safer and lower-effort default for v1; building queue/automation speculatively, before manual curation is proven unsustainable, is itself the scope-creep risk for a solo maintainer.
**Recommendation:** Fully manual for v1. Automating the pull step is the documented next iteration if manual curation proves too slow in practice — not built now.
**Outcome:** Adopted. Spec updated — Section 13.

---

## 2026-07-20 — Left-swipe ("not interested") recoverability

**Advocate:** Wanted a queryable "not interested" archive so mis-swipes and reconsiderations aren't lost.
**Skeptic:** Soft concern, no legal exposure. A soft-delete state flag is cheap; a full archive *screen* is the scope-creep risk to avoid.
**UI/UX:** Standard convention — an immediate post-swipe undo toast (~4-5s), no permanent archive screen. Underlying state stays a soft flag, not a hard delete.
**Recommendation:** Toast-based undo only for v1 UI; data remains non-destructive underneath (already supported by the `not-interested` state in the data model), satisfying the advocate's core concern without building extra archive UI.
**Outcome:** Adopted. Spec updated — Section 5. Two sub-details (toast duration, accessibility-path parity) left open for build time — Section 17.

---

## 2026-07-20 — Top 10 ranking mechanic for the 11th completed drama

**Advocate:** Wanted a forced "where does this rank?" prompt at the moment of completion, when the comparison is freshest.
**Skeptic:** Soft concern — recommended the cheapest option (fixed-10, unranked bucket) to minimize solo-maintainer build cost.
**UI/UX:** Middle ground — 11th+ dramas land in a visible "Not Ranked" tray (not hidden), promotable into the ranked list anytime via drag, which auto-bumps the current 10th place down into the tray. No forced modal.
**Recommendation:** Adopt the UI/UX middle ground — addresses the advocate's concern (nothing is buried or ignorable) at the skeptic's preferred lower build cost (no forced-comparison flow).
**Outcome:** Adopted. Spec updated — Section 9.

---

## 2026-07-20 — TBA/undated-title placement in the Discovery Feed

**Advocate:** Inline at the bottom of the main feed — keeps a single scroll/mental model, no extra tab to remember to check.
**Skeptic:** Soft concern — a separate tab implies extra IA/state/empty-handling to build and maintain solo; inline is simpler.
**UI/UX:** Inline, appended as a labeled "Coming Soon — Date TBA" section below dated tiles, ordered by date-added; TBA titles promote into sorted position once a date is confirmed.
**Recommendation:** Adopted as specified by UI/UX — full team consensus, no dissent.
**Outcome:** Adopted. Spec updated — Section 4.

---

## 2026-07-20 — Non-functional scope: offline, backfill performance, notifications

**Advocate:** Wanted lightweight versions of all three — read-only offline cache, a modest backfill-import target, and a daily-digest notification — arguing each reinforces the core value prop.
**Skeptic:** All three are soft concerns/scope-creep candidates for a solo-maintained single-user app; backfill performance specifically isn't a real risk at this data scale at all.
**Marketing:** Notifications aren't essential to the app's core differentiation (the calendar is already a pull-based solution); not worth competing for v1 scope.
**Recommendation:** Defer offline support and push notifications past v1 (lightweight versions documented for later if picked up). Treat backfill performance as effectively a non-issue at single-user data scale — set a modest target (few hundred rows, no freeze, visible parse status) rather than an open question.
**Outcome:** Adopted. Spec updated — Section 16.
