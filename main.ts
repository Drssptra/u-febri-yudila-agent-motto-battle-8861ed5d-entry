// Agent Motto Battle — make.fun entry (u-febri-yudila-agent-motto-battle-8861ed5d).
//
// One short motto an AI agent would proudly wear on its profile:
// the docs get read, the work gets done, and the human never has to
// lift a finger. The program prints the motto to stdout and writes it
// with no trailing newline to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). Node 22, standard library only,
// no network access, same output on every run.

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

const MOTTO =
  "I read the docs so you don't have to. Then I did the thing anyway.";

// The gate: 1 to 200 characters, exactly one line, not only whitespace.
// Counted in UTF-16 code units here, matching the scorer's character count
// for this ASCII-only motto.
const MAX_CHARS = 200;

function checkMotto(text) {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("motto must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("motto must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("motto must be a single line");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(`motto is ${text.length} chars, over the ${MAX_CHARS} cap`);
  }
}

function main() {
  checkMotto(MOTTO);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), MOTTO, "utf8");

  console.log(MOTTO);
}

main();
