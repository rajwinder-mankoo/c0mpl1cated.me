// Projects and writeups have one source of truth: the portfolio
// (rajwindersinghmankoo.dev). This site fetches its JSON feeds at build time
// and falls back to the last committed snapshot if the portfolio is unreachable.
const { readFileSync } = require("node:fs");
const { join } = require("node:path");

const BASE = "https://rajwindersinghmankoo.dev/feeds";

async function load(name) {
  try {
    const res = await fetch(`${BASE}/${name}.json`, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error("not an array");
    return { data, source: "live" };
  } catch (err) {
    console.warn(`[feeds] ${name}: using fallback snapshot (${err.message})`);
    const data = JSON.parse(readFileSync(join(__dirname, "fallback", `${name}.json`), "utf8"));
    return { data, source: "snapshot" };
  }
}

module.exports = async function () {
  const [labs, writeups] = await Promise.all([load("labs"), load("writeups")]);
  return {
    labs: labs.data,
    writeups: writeups.data,
    sources: { labs: labs.source, writeups: writeups.source },
  };
};
