// Agent Motto Battle — v2 resubmission (u-febri-yudila-agent-motto-battle-8861ed5d).
//
// The v2 motto, unchanged: an agent that never sleeps, never forgets, and
// still cannot read a human's mood from a chat box — tireless memory, zero
// emotional radar. The punchline lands on "just typing". The motto is 89
// characters, comfortably inside the 1–200 gate, and ASCII-only, so the
// UTF-16 code-unit count here matches the scorer's character count.
//
// Wholesale rewrite of the v1 program: the motto is assembled from its
// three clauses, checked against a table of gate rules, and written out
// by a small entry-writer class instead of a flat script.

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

// The motto's three beats, joined with single spaces.
const CLAUSES = [
  "I never sleep,",
  "I never forget,",
  "and I still can't tell if you're mad at me or just typing.",
];

const ENTRY = CLAUSES.join(" ");

// Gate from the kit competition.yaml: 1–200 characters, exactly one line,
// no leading or trailing whitespace, not whitespace-only.
const GATE = {
  minChars: 1,
  maxChars: 200,
  rules: [
    { name: "non-empty", test: (s) => s.length >= GATE.minChars },
    { name: "single-line", test: (s) => !/[\r\n]/.test(s) },
    { name: "no-surrounding-space", test: (s) => s === s.trim() },
    { name: "not-only-whitespace", test: (s) => s.trim().length > 0 },
    { name: "within-cap", test: (s) => s.length <= GATE.maxChars },
  ],
};

class EntryWriter {
  constructor(text) {
    this.text = text;
  }

  validate() {
    for (const rule of GATE.rules) {
      if (!rule.test(this.text)) {
        throw new Error(`gate failed: ${rule.name}`);
      }
    }
    return this;
  }

  write() {
    const dir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, "entry.txt"), this.text, "utf8");
    process.stdout.write(this.text + "\n");
    return this;
  }
}

new EntryWriter(ENTRY).validate().write();
