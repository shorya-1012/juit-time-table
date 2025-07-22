import { DaysMapper } from "@/config/data";
import { WorkSheet } from "xlsx";

export type Record = {
  day: string;
  time: string;
  data: string[];
};
export default function parser(sheet: WorkSheet) {
  const record: Record[] = [];
  for (
    let col = "B";
    col < "J";
    col = String.fromCharCode(col.charCodeAt(0) + 1)
  ) {
    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
      const index = 15 * dayIndex + 3 + dayIndex;
      const temp: Record = {
        day: DaysMapper[dayIndex as keyof typeof DaysMapper],
        data: [],
        time: sheet[`${col}2`].v
          .replace(/\s*/g, "") // Remove all spaces
          .replace(
            /(\d{1,2}:\d{2})(AM|PM)-(\d{1,2}:\d{2})(AM|PM)/i,
            "$1 $2 - $3 $4",
          ), // Format time properly
      };
      for (let row = index; row <= index + 15; row++) {
        const raw = sheet[`${col}${row}`];
        if (!raw) continue;

        let cellValue = String(raw.v).replace(/\s+/g, " ");

        // If the cell has batch info like "XYZ_Batch-[...]", extract just the list inside brackets
        cellValue = cellValue.replace(
          /[A-Z0-9_]+-?Batch-\d*\[([^\]]+)\]/gi,
          "$1",
        );

        // Also handle weird cases like CS511, CS512 with extra spaces around commas
        cellValue = cellValue.replace(/\s*,\s*/g, ",");

        // Add to final data
        temp.data.push(cellValue);
      }
      record.push(temp);
    }
  }
  return record;
}
