import type { LocalizedString } from "@/types";

/**
 * First-person accounts from people the programs have trained. A quote is
 * the one thing on a fundraising page that cannot be drafted or approximated
 * — a name, a hospital and a sentence either come from a real person or they
 * do not exist. So this list ships empty and `ProofStory` removes itself
 * until the client supplies at least one.
 */
export interface Story {
  id: string;
  /** Full name, as the person wants it published. */
  name: string;
  role: LocalizedString;
  /** Town or hospital, for the "why outside Yerevan" point. */
  location: LocalizedString;
  /** Which course or programme, so the claim is checkable. */
  programme: LocalizedString;
  quote: LocalizedString;
  /** Portrait in /public/images/stories, 4:5. Null renders an initial instead. */
  photo: string | null;
  photoAlt: LocalizedString | null;
}

export const stories: Story[] = [];

export function getStories(): Story[] {
  return stories;
}
