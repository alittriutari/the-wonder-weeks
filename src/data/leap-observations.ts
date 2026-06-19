import type { LeapObservation } from "@/types";

/**
 * Commonly reported behavioral observations from the Wonder Weeks framework.
 *
 * IMPORTANT: These are observations collected from caregivers, not clinical predictions.
 * Individual babies may show many, few, or none of these patterns.
 * Their absence does not indicate a developmental concern.
 *
 * Source: Van de Rijt & Plooij, "The Wonder Weeks"
 */
export const LEAP_OBSERVATIONS: LeapObservation[] = [
  {
    leapNumber: 1,
    before: [
      "Increased fussiness or crying without a clear cause",
      "Wanting to feed more frequently",
      "Seeking more physical closeness or contact",
      "Shorter sleep stretches",
      "More difficult to settle than usual",
    ],
    during: [
      "Heightened sensitivity to light, sound, or touch",
      "More alert and visually engaged with surroundings",
      "Comfort-seeking through sucking or being held",
      "Mood changes — may seem more unsettled or more content in turns",
      "Feeding pattern changes",
    ],
    note:
      "This is the first and shortest leap. Many caregivers report that it passes quickly.",
  },
  {
    leapNumber: 2,
    before: [
      "More frequent crying or fussiness",
      "Harder to settle for naps or bedtime",
      "Wanting to be held or carried more",
      "Waking more often overnight",
      "Feeding more frequently or cluster feeding",
    ],
    during: [
      "Apparent fascination with simple repeating patterns",
      "Longer periods of alert wakefulness",
      "Increased interest in faces and voices",
      "May seem briefly calmer after a period of fussiness",
      "More expressive responses to familiar people",
    ],
  },
  {
    leapNumber: 3,
    before: [
      "Increased clinginess or wanting constant contact",
      "Disrupted nap or sleep rhythms",
      "More tearful or harder to comfort",
      "Feeding changes — may be distracted or feed more frequently",
      "Increased sensitivity to environment",
    ],
    during: [
      "Smoother, more purposeful movements noticed",
      "Increased awareness of their own body",
      "May seem to enjoy motion (rocking, bouncing) more than usual",
      "Short windows of calm curiosity followed by fussier periods",
      "More responsive to touch and voice",
    ],
  },
  {
    leapNumber: 4,
    before: [
      "Pronounced increase in fussiness — often the most noticeable so far",
      "Significantly more clingy",
      "Shorter or more disrupted naps",
      "Waking frequently overnight",
      "Harder to settle without contact",
      "Increased comfort feeding",
      "Seeming harder to entertain or soothe",
    ],
    during: [
      "Experimenting with cause and effect",
      "Noticing sequences — anticipating what comes next",
      "Mood can shift quickly between upset and content",
      "May show first clear laughs or social smiles",
      "More distracted during feeds",
      "Increased interest in watching and tracking objects",
      "Sleep may remain unsettled throughout",
    ],
    note:
      "Leap 4 is longer than earlier leaps (several weeks) and is commonly reported as one of the more challenging periods.",
  },
  {
    leapNumber: 5,
    before: [
      "Strong clinginess, especially around primary caregiver",
      "Protest when put down or left even briefly",
      "Sleep changes — more wakings or resistance to settling",
      "Feeding changes",
      "Increased emotional reactivity",
      "Seeking more physical closeness throughout the day",
    ],
    during: [
      "Possible early signs of stranger awareness or anxiety",
      "Distress when caregiver leaves the room",
      "Reaching and grasping with increasing intention",
      "Longer periods of focused engagement with objects",
      "Sleep may continue to be disrupted",
      "Mood variability — moments of great curiosity alongside upset",
    ],
    note:
      "Separation-related observations often appear for the first time around this leap.",
  },
  {
    leapNumber: 6,
    before: [
      "Increased clinginess and following the caregiver around",
      "More frequent night wakings",
      "Resistance to naps",
      "Heightened emotional responses",
      "Wanting to be carried or held more",
      "More easily frustrated",
    ],
    during: [
      "Sorting and examining objects with apparent intent",
      "Noticing differences — may react to unfamiliar people or environments",
      "Increased vocalisation and babbling",
      "Curiosity that shifts rapidly between objects",
      "May seem more content when exploring independently",
      "Mood can vary significantly across the day",
    ],
  },
  {
    leapNumber: 7,
    before: [
      "More clinging and need for closeness",
      "Sleep disruptions — difficulty settling or more night wakings",
      "Increased emotional sensitivity",
      "More frequent crying or frustration",
      "Wanting reassurance more often",
    ],
    during: [
      "Testing limits and sequences repeatedly",
      "Apparent problem-solving attempts",
      "Increased use of gesture and vocalization to communicate",
      "Frustration when something does not work as expected",
      "Periods of intense focus followed by restlessness",
      "May seem more aware of routines and notice changes to them",
    ],
  },
  {
    leapNumber: 8,
    before: [
      "Increased clinginess as toddlerhood approaches",
      "Sleep changes — more difficulty settling",
      "More emotional or tearful than usual",
      "Wanting caregiver present more",
      "Frustration with limitations",
    ],
    during: [
      "Attempting complex sequences of action",
      "Apparent desire to 'do it myself'",
      "More varied imitation of adults",
      "Strong reactions when a sequence is interrupted",
      "Comfort-seeking alongside pushes for independence",
      "Vocabulary or communication attempts may increase",
    ],
    note:
      "Around this time many babies are pulling to stand or beginning to walk, which can itself affect sleep and mood independently of the leap.",
  },
  {
    leapNumber: 9,
    before: [
      "More frequent emotional outbursts",
      "Strong preference for specific people, objects, or routines",
      "More difficult to redirect or settle",
      "Sleep may be disrupted again",
      "Increased demand for caregiver attention",
    ],
    during: [
      "Strong opinions about how things should be done",
      "Noticeable frustration when expectations are not met",
      "Beginning to notice fairness and 'wrongness'",
      "Increased use of words or pointing to communicate preferences",
      "Mood swings can be pronounced",
      "May cling to specific objects or comfort items",
    ],
    note:
      "This leap coincides with the period many caregivers describe as the beginning of toddler boundary-testing.",
  },
  {
    leapNumber: 10,
    before: [
      "Increased clinginess or emotional sensitivity",
      "Sleep disruptions",
      "More frequent tears or frustration",
      "Wanting more caregiver involvement in play",
      "Resistance to transitions",
    ],
    during: [
      "Apparent interest in social rules and fairness",
      "Negotiating and testing limits more deliberately",
      "Combining words into early sentences",
      "Strong emotional responses to perceived injustice",
      "Comfort-seeking alongside increased independence",
      "Wide variation in mood across the day",
    ],
    note:
      "Leap 10 is the final leap described in the Wonder Weeks framework. After this, developmental leaps continue but are not covered by the book's schedule.",
  },
];

/**
 * Look up observations for a specific leap number.
 * Returns null if no observations are defined (future-proofing).
 */
export function getLeapObservations(leapNumber: number): LeapObservation | null {
  return LEAP_OBSERVATIONS.find((o) => o.leapNumber === leapNumber) ?? null;
}
