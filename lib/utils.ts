// May GOD help anyone who wants to understand this

type ClassInfo = {
  type: "Lecture" | "Practical" | "Tutorial";
  courseCode: string;
  batches: string[];
  coordinator: string;
  venue: string;
  raw: string;
};

// Const assertion ensures narrow types
const typeMap = {
  L: "Lecture",
  P: "Practical",
  T: "Tutorial",
} as const;

export function findClassForBatch(
  entries: string[],
  batch: string,
): ClassInfo | null {
  for (const entry of entries) {
    // God Help Me.
    const match = entry.match(
      /^([LPT])-([A-Z0-9]+)\s+([\dA-Z,]+)\s+\(([^)]+)\)\s+(.+)$/,
    );

    // In case the entry is for an elective subject
    const other_match = entry.match(
      /^([A-Z])\-([A-Z0-9]+)\s+([^\[\]()]+)\[([^\]]+)\]\s+\(([^)]+)\)\s+([A-Za-z0-9]+)$/,
    );

    if (match) {
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
    } else if (other_match) {
      const [, typeCode, courseCode, _, batchListStr, coordinator, venue] =
        other_match;
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
  }

  return null;
}
