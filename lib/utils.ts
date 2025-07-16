type ClassInfo = {
  type: "Lecture" | "Practicle" | "Tutorial";
  courseCode: string;
  batches: string[];
  coordinator: string;
  venue: string;
  raw: string;
};

// Const assertion ensures narrow types
const typeMap = {
  L: "Lecture",
  P: "Practicle",
  T: "Tutorial",
} as const;

export function findClassForBatch(
  entries: string[],
  batch: string,
): ClassInfo | null {
  for (const entry of entries) {
    const match = entry.match(
      /^([LPT])-([A-Z0-9]+)\s+([\dA-Z,]+)\s+\(([^)]+)\)\s+(.+)$/,
    );

    if (!match) continue;

    const [, typeCode, courseCode, batchListStr, coordinator, venue] = match;
    const batchList = batchListStr.split(",");

    if (batchList.includes(batch)) {
      return {
        type: typeMap[typeCode as keyof typeof typeMap],
        courseCode,
        batches: batchList,
        coordinator,
        venue,
        raw: entry,
      };
    }
  }

  return null;
}
