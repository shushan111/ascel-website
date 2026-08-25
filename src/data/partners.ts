import type { Partner } from "@/types";

const partners: Partner[] = [
  { id: "partner-1", name: "Partner organization", isPlaceholder: true },
  { id: "partner-2", name: "Partner organization", isPlaceholder: true },
  { id: "partner-3", name: "Partner organization", isPlaceholder: true },
  { id: "partner-4", name: "Partner organization", isPlaceholder: true },
  { id: "partner-5", name: "Partner organization", isPlaceholder: true },
  { id: "partner-6", name: "Partner organization", isPlaceholder: true },
];

export function getPartners() {
  return partners;
}
