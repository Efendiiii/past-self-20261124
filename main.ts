// Two Lines to Your Past Self — make.fun entry.
// Writes exactly two lines (one sentence each) to /output/entry.txt.
// Node 22, stdlib only. No network, no randomness, no clock: fully deterministic.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "Don't skip the bus on 14 March — the one you miss is the one where you meet the friend who changes your next three years.";
const LINE_2 =
  "That morning mattered because a missed bus felt small, but it rerouted everything after it, and I only saw the map once it was drawn.";

const text = `${LINE_1}\n${LINE_2}\n`;

// Guards from RULES.txt: the entry is exactly two lines, UTF-8 text of
// 1 to 280 characters, not only white space.
const body = text.replace(/\n$/, "");
const lines = body.split("\n");
if (lines.length !== 2) {
  throw new Error(`expected exactly 2 lines, got ${lines.length}`);
}
if (text.length < 1 || text.length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${text.length}`);
}
for (const [i, line] of lines.entries()) {
  if (!line.trim()) {
    throw new Error(`line ${i + 1} is empty`);
  }
  // One sentence per line: exactly one sentence-ending mark, at the end.
  const ends = line.match(/[.!?]/g) ?? [];
  if (ends.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error(`line ${i + 1} must be a single sentence`);
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
