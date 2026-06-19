import type { LeapDefinition } from "@/types";

/**
 * Wonder Weeks leap definitions.
 *
 * Timing is based on weeks from Estimated Due Date (EDD), as documented in
 * "The Wonder Weeks" by Van de Rijt & Plooij. These windows are presented as
 * approximate developmental schedules — not behavioral predictions or guarantees.
 * Every baby develops at their own pace.
 *
 * Each leap has a ±fuzz window of roughly 0.5–1 week built into startWeek/endWeek.
 */
export const LEAP_DEFINITIONS: LeapDefinition[] = [
  {
    number: 1,
    name: "The World of Changing Sensations",
    startWeek: 4.5,
    endWeek: 5.5,
    description:
      "Your baby becomes more aware of their body and senses. They may seem fussier as their nervous system processes new sensory input more richly.",
    skills: [
      "Increased alertness to surroundings",
      "Stronger response to touch and sound",
      "More expressive facial movements",
    ],
  },
  {
    number: 2,
    name: "The World of Patterns",
    startWeek: 7.5,
    endWeek: 9.5,
    description:
      "Babies begin recognising simple patterns — in sight, sound, smell, taste, and touch. The world starts to feel more familiar and structured.",
    skills: [
      "Tracking moving objects with eyes",
      "Recognising familiar faces and voices",
      "Noticing repeating sounds and shapes",
    ],
  },
  {
    number: 3,
    name: "The World of Smooth Transitions",
    startWeek: 11.5,
    endWeek: 12.5,
    description:
      "Movements and perceptions become smoother and more fluid. Babies discover they can control transitions — reaching, turning, shifting gaze.",
    skills: [
      "Smoother, more intentional arm and leg movements",
      "Better head control",
      "Following objects in an arc rather than in steps",
    ],
  },
  {
    number: 4,
    name: "The World of Events",
    startWeek: 14.5,
    endWeek: 19.5,
    description:
      "Baby discovers that events are sequences with a beginning and an end. This is a longer, more complex leap — expect several weeks of heightened fussiness.",
    skills: [
      "Anticipating familiar sequences (feeding, bath time)",
      "Beginning to roll",
      "Experimenting with cause and effect",
      "Laughing out loud",
    ],
  },
  {
    number: 5,
    name: "The World of Relationships",
    startWeek: 22.5,
    endWeek: 26.5,
    description:
      "Baby understands distance and relationships between things — including their relationship with you. Separation anxiety may emerge for the first time.",
    skills: [
      "Sitting with support",
      "Recognising distance between objects",
      "Stranger anxiety beginning",
      "Reaching for and grabbing objects with intention",
    ],
  },
  {
    number: 6,
    name: "The World of Categories",
    startWeek: 33.5,
    endWeek: 37.5,
    description:
      "Baby begins grouping the world into categories — dogs vs. not dogs, familiar vs. unfamiliar people. Curiosity explodes.",
    skills: [
      "Pulling to stand",
      "Sorting and grouping objects",
      "Recognising animal sounds",
      "Imitating more complex behaviours",
    ],
  },
  {
    number: 7,
    name: "The World of Principles",
    startWeek: 41.5,
    endWeek: 46.5,
    description:
      "Baby discovers that things happen according to principles — sequences, rules, and patterns they can apply themselves. Problem-solving emerges.",
    skills: [
      "Cruising along furniture",
      "Understanding 'no'",
      "Stacking objects",
      "First intentional word sounds",
    ],
  },
  {
    number: 8,
    name: "The World of Programs",
    startWeek: 51.5,
    endWeek: 54.5,
    description:
      "Baby learns that multiple sequences can be combined into a flexible program — like getting dressed or cooking. Toddlerhood is beginning.",
    skills: [
      "Independent walking (often around this time)",
      "Following simple two-step instructions",
      "Increased vocabulary",
      "Pretend play begins",
    ],
  },
  {
    number: 9,
    name: "The World of Principles (Advanced)",
    startWeek: 59.5,
    endWeek: 64.5,
    description:
      "Toddler develops a sense of norms, standards, and how things 'should' be done. Frustration when expectations aren't met is completely normal.",
    skills: [
      "Strong opinions and preferences",
      "Recognising when something is wrong or broken",
      "Increased use of words and gestures",
      "Wanting to do things independently",
    ],
  },
  {
    number: 10,
    name: "The World of Systems",
    startWeek: 70.5,
    endWeek: 76.5,
    description:
      "The final leap described in the book. Your toddler begins to understand that systems — families, friendships, rules — are flexible and can be changed. This is a major step toward complex social thinking.",
    skills: [
      "Understanding fairness and turn-taking",
      "Combining words into short sentences",
      "Expressing a wider range of emotions",
      "Negotiating and testing limits",
    ],
  },
];
