// Find MyDramaList "official poster has not been released yet" stubs.
//
// The stub is a generated template: a flat light-grey field with one
// blue band and black caption text. Real posters are photographic or
// illustrated and never that flat. Two cheap measurements separate
// them: the single most common colour covers a large share of the
// image, and that colour is a neutral grey.
//
// Decoding runs in headless Chromium via canvas, because the system
// PIL in this container has a broken _imaging extension.
//
// Usage:
//   node find-placeholders.js              scan embedded POSTER_DATA blobs
//   node find-placeholders.js <url> [...]  check candidate URLs first
const fs = require("fs");
const { chromium } = require("/opt/node22/lib/node_modules/playwright");
const SRC = "/home/user/kalendar/index.html";

function blobs() {
  const s = fs.readFileSync(SRC, "utf8");
  const slice = s.slice(s.indexOf("var POSTER_DATA = {"), s.indexOf("var POSTER_SOURCE = {"));
  const out = [];
  slice.replace(/"([^"]+)": "(data:image\/jpeg;base64,[^"]*)"/g, (_, k, v) => { out.push([k, v]); return ""; });
  return out;
}

(async () => {
  const urls = process.argv.slice(2);
  const items = urls.length ? urls.map(u => [u, u]) : blobs();
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto("about:blank");

  const results = await page.evaluate(async function (items) {
    function load(src) {
      return new Promise(function (res) {
        const im = new Image();
        im.crossOrigin = "anonymous";
        im.onload = () => res(im);
        im.onerror = () => res(null);
        im.src = src;
      });
    }
    const out = [];
    for (const pair of items) {
      const key = pair[0], src = pair[1];
      const im = await load(src);
      if (!im) { out.push({ key, error: "did not load" }); continue; }
      const W = 60, H = 90;
      const c = document.createElement("canvas");
      c.width = W; c.height = H;
      const ctx = c.getContext("2d");
      ctx.drawImage(im, 0, 0, W, H);
      const px = ctx.getImageData(0, 0, W, H).data;
      const tally = new Map();
      for (let i = 0; i < px.length; i += 4) {
        const k = px[i] + "," + px[i + 1] + "," + px[i + 2];
        tally.set(k, (tally.get(k) || 0) + 1);
      }
      let best = null, bestN = 0;
      tally.forEach(function (n, k) { if (n > bestN) { bestN = n; best = k; } });
      const rgb = best.split(",").map(Number);
      out.push({
        key,
        w: im.naturalWidth, h: im.naturalHeight,
        rgb,
        share: bestN / (W * H),
        neutral: Math.max.apply(null, rgb) - Math.min.apply(null, rgb),
      });
    }
    return out;
  }, items);

  await browser.close();

  let real = 0; const stubs = [], errs = [];
  results.forEach(function (r) {
    if (r.error) { errs.push(r); return; }
    const isStub = r.share > 0.45 && r.neutral <= 12 && r.rgb[0] >= 120 && r.rgb[0] <= 200;
    if (isStub) stubs.push(r); else real++;
  });
  console.log("scanned: " + results.length + "   real: " + real + "   stubs: " + stubs.length + "   failed: " + errs.length);
  stubs.sort((a, b) => a.key.localeCompare(b.key)).forEach(function (r) {
    console.log("  STUB  " + r.key.padEnd(30) + r.w + "x" + r.h +
      "  dominant rgb(" + r.rgb.join(",") + ") covers " + Math.round(r.share * 100) + "%");
  });
  errs.forEach(r => console.log("  FAILED  " + r.key));
})();
