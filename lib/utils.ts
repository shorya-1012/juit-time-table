import {
  ELECTIVE_SUBJECTS,
  ELECTIVE_SUBJECTS_CODE,
  ElectiveSubjects,
  ElectiveSubjectsCode,
} from "@/config/data";

const typeMap = {
  L: "Lecture",
  P: "Practical",
  T: "Tutorial",
} as const;

type TYPE_MAP = keyof typeof typeMap;

const patterns = [
  // Pattern 1: Bracketed batches like: PCC_LAB__Batch[23A11,23A12]
  /^([LPT])-([A-Z0-9]+)\s+[^\[\]()]*\[([\dA-Z,\/]+)\]\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 2: Slash-separated batches like: 23E11/23F11
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z\/]+)\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 3: Comma-separated (or space-separated) batches like: 23A11,23A12,...
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z,]+)\s+\(([^)]+)\)\s+(.+)$/,
];

export function toDisclude(course: string, minor: string | null): string[] {
  const subjects = ElectiveSubjects[course as ELECTIVE_SUBJECTS];
  if (!subjects.length || !minor) return [];

  return subjects
    .filter((subject) => subject !== minor)
    .flatMap(
      (subject) =>
        ElectiveSubjectsCode[subject as ELECTIVE_SUBJECTS_CODE] || [],
    );
}

export function findClassForBatch(
  batch: string,
  entries: string[],
  toDisclude: string[],
) {
  for (const entry of entries) {
    for (const pattern of patterns) {
      const match = entry.match(pattern);
      if (!match) continue;

      const [, typeCode, courseCode, batchListStr, coordinator, venue] = match;

      // Handle comma or slash separated values, normalize to array
      const batchList = batchListStr.split(/[\/,]/).map((s) => s.trim());

      if (toDisclude.includes(courseCode) || !batchList.includes(batch)) {
        continue;
      }

      return {
        type: typeMap[typeCode as TYPE_MAP],
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
