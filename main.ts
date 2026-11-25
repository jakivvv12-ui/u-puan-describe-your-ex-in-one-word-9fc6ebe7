import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Entry for make.fun "Describe Your Ex in One Word":
// "Typo" — the whole relationship was a mistake, caught too late.
const WORD = "Typo";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outputDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (WORD.length < 1 || WORD.length > 111) {
  throw new Error("entry must be 1 to 111 characters");
}
if (WORD.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (WORD.trim() !== WORD || /\s/.test(WORD)) {
  throw new Error("entry must be exactly one word with no whitespace");
}

mkdirSync(outputDir, { recursive: true });
const target = join(outputDir, "entry.txt");
writeFileSync(target, WORD, "utf8");

const roundTrip = readFileSync(target, "utf8");
if (roundTrip !== WORD) {
  throw new Error("round-trip check failed: entry.txt does not match the word");
}
