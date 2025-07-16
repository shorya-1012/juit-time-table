import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Days, TimeSlots } from "@/config/data";
import { DATA } from "@/hooks/use-timetable";
import { findClassForBatch } from "@/lib/utils";

type FullTimetableTableProps = {
  batch: string;
  data: DATA[];
};

export function FullTimetableTable({ batch, data }: FullTimetableTableProps) {
  const columns = ["TIME", ...Days];

  return (
    <div className="overflow-auto">
      <Table aria-label="Weekly Timetable">
        <TableHeader>
          {columns.map((col) => (
            <TableColumn key={col}>{col}</TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {TimeSlots.map((slot) => (
            <TableRow key={slot}>
              {[
                <TableCell
                  key="time"
                  className="font-semibold text-gray-800 dark:text-gray-200"
                >
                  {slot}
                </TableCell>,
                ...Days.map((day) => {
                  const shortDay = day.slice(0, 3);
                  const entry = data.find(
                    (item) => item.day === shortDay && item.time === slot,
                  );
                  let classInfo = null;
                  if (entry && entry.data) {
                    classInfo = findClassForBatch(entry.data, batch);
                  }
                  return (
                    <TableCell
                      key={`${slot}-${day}`}
                      className="p-2 align-top border-b border-gray-300 dark:border-neutral-700"
                    >
                      {classInfo ? (
                        <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-md dark:shadow-neutral-900 p-3 space-y-1 hover:shadow-lg dark:hover:shadow-neutral-700 transition-shadow duration-300">
                          <div className="font-semibold text-gray-900 dark:text-neutral-100">
                            {classInfo.courseCode}
                          </div>
                          <div className="text-xs text-gray-600 dark:text-neutral-400">
                            {classInfo.type}
                          </div>
                          <div className="text-xs text-gray-700 dark:text-neutral-300">
                            {classInfo.venue}
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 dark:text-neutral-500">
                          —
                        </span>
                      )}
                    </TableCell>
                  );
                }),
              ]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
