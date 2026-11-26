// One Line, One Laugh — make.fun entry (u-deysumbrella-one-line-one-laugh-e0cdcda9).
// Writes one funny line: a single joke of 1–140 characters, to /output/entry.txt.
// Node stdlib only. Deterministic: the line is a fixed string.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My smart fridge filed a restraining order — I keep opening it at 3 a.m. and staring into the light like it owes me answers.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry line must be 1-140 characters, got ${LINE.length}`);
}
if (/[\u0000-\u001F\u007F]/.test(LINE)) {
  throw new Error("entry line must not contain control characters");
}
if (LINE.includes("\n") || LINE.trim() !== LINE) {
  throw new Error("entry line must be a single line with no surrounding whitespace");
}
if (!/[.!?]$/.test(LINE)) {
  throw new Error("entry line must end with sentence punctuation");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const file = join(outDir, "entry.txt");
writeFileSync(file, LINE, "utf8");
// Leave the output file world-readable; never chmod the output dir itself.
chmodSync(file, 0o644);

const back = readFileSync(file, "utf8");
if (back !== LINE) {
  throw new Error("verification failed: entry.txt does not match the line");
}
