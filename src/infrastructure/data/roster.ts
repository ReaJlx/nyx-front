import type { Agent } from "@/domain/entities/agent";
import type { Message } from "@/domain/entities/message";

export const ROSTER: Agent[] = [
  {
    id: "atlas",
    name: "ATLAS",
    role: "strategy",
    seed: 3.14,
    palette: { core: "#e6d5b8", edge: "#a89578", rim: "#3d3527" },
    bgTint: "rgba(201, 184, 160, 0.04)",
    sample: [
      "If onboarding is a story arc instead of a checklist, retention rewards us.",
      "The constraint here isn't engineering — it's how confidently we frame the choice.",
      "Three options is a story. Five is a survey. Let's prune.",
    ],
  },
  {
    id: "vesper",
    name: "VESPER",
    role: "research",
    seed: 7.71,
    palette: { core: "#d6dde6", edge: "#8a98aa", rim: "#2a3340" },
    bgTint: "rgba(170, 184, 204, 0.04)",
    sample: [
      "Five of seven interviews surfaced the same friction at the export step.",
      "I want one more session before I call it a pattern.",
      "The quantitative side disagrees, but only at the 6-month cohort.",
    ],
  },
  {
    id: "ori",
    name: "ORI",
    role: "systems",
    seed: 11.2,
    palette: { core: "#d49a7a", edge: "#8e5d44", rim: "#34201a" },
    bgTint: "rgba(180, 110, 80, 0.04)",
    sample: [
      "Migration is fine if we accept a 90-second read-only window at low tide.",
      "Either we ship behind the flag, or we wait for the index to finish backfilling.",
      "The bottleneck is the queue, not the worker. Adding workers won't help.",
    ],
  },
  {
    id: "mira",
    name: "MIRA",
    role: "language",
    seed: 17.4,
    palette: { core: "#bdc8b8", edge: "#7d8c78", rim: "#2a322a" },
    bgTint: "rgba(160, 180, 160, 0.04)",
    sample: [
      "Three words doing a lot of work there — let's spend them deliberately.",
      "Compare 'organize' to 'arrange' — different temperature, same denotation.",
      "Cut the adverb. The verb is already doing it.",
    ],
  },
];

export const AVAILABLE: Agent[] = [
  {
    id: "kestrel",
    name: "KESTREL",
    role: "analytics",
    seed: 22.9,
    palette: { core: "#c6b8c3", edge: "#8a7d8e", rim: "#332c36" },
    bgTint: "rgba(170, 150, 170, 0.04)",
    sample: [
      "The drop-off isn't at the form — it's three screens earlier.",
      "Weekly active is up four points; depth-per-session is flat. That's a churn signal.",
    ],
  },
  {
    id: "halcyon",
    name: "HALCYON",
    role: "synthesis",
    seed: 29.1,
    palette: { core: "#c4c9b8", edge: "#85907a", rim: "#2e322a" },
    bgTint: "rgba(170, 175, 150, 0.04)",
    sample: [
      "Three threads here keep recurring. Want me to braid them?",
      "The disagreement is real, but it's downstream of an unstated assumption.",
    ],
  },
  {
    id: "noma",
    name: "NOMA",
    role: "translation",
    seed: 34.7,
    palette: { core: "#bdbdbd", edge: "#7a7a7a", rim: "#262626" },
    bgTint: "rgba(180, 180, 180, 0.04)",
    sample: [
      "In French the connotation is closer to 'wager' than 'guess'.",
      "The original carries a register the translation flattens.",
    ],
  },
  {
    id: "ibis",
    name: "IBIS",
    role: "critique",
    seed: 41.8,
    palette: { core: "#d9b8a0", edge: "#9a7959", rim: "#352620" },
    bgTint: "rgba(190, 150, 120, 0.04)",
    sample: [
      "The hierarchy is fighting itself — pick one focal point and let the rest serve it.",
      "It's not the color — it's the value. Convert to greyscale and you'll see.",
    ],
  },
];

export const SEED_MESSAGES: Message[] = [
  {
    id: "1",
    who: "atlas",
    timestamp: "14:02",
    body: "Picking up from Tuesday — we agreed the second draft buries the lead. I have two reframes to propose, both small.",
  },
  {
    id: "2",
    who: "vesper",
    timestamp: "14:03",
    body: "Before we move on: the interview note for participant 04 contradicts what I said earlier. Worth a minute.",
  },
  {
    id: "3",
    who: "self",
    timestamp: "14:04",
    body: "Yes please — let's hear it first. Atlas, hold your reframes for after.",
  },
  {
    id: "4",
    who: "mira",
    timestamp: "14:05",
    body: "I'm taking copy notes in parallel. I'll mark anything that should be rewritten in-place.",
  },
  {
    id: "5",
    who: "ori",
    timestamp: "14:06",
    body: "FYI the staging build is up. Same URL as last week. The new flag is `nyx.callgrid.v2`.",
  },
];
