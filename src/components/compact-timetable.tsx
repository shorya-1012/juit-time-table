import { useCompactTimetable } from "@/hooks/use-timetable";
import { extractTimetableEntries } from "@/utils";
import { type CourseKey } from "@/utils/constants";
import { Card, CardHeader, CardBody } from "@heroui/card";

type Props = {
  course: CourseKey;
  batch: string;
};

export function CompactTimetable({ course, batch }: Props) {
  const { data, error, loading } = useCompactTimetable(course);

  if (loading)
    return <div className="text-default-500">Loading timetable…</div>;
  if (error) return <div className="text-danger">{error}</div>;
  if (!data) return null;

  return (
    <div className="flex flex-col gap-4 pt-16 px-4">
      {data.map((ele) => {
        const entry = extractTimetableEntries(batch, ele.data);
        if (!entry) {
          return (
            <Card key={`${ele.day}-${ele.time}`}>
              <CardHeader>No Class in this slot</CardHeader>
            </Card>
          );
        }
        return (
          <Card key={`${ele.day}-${ele.time}`}>
            {entry.map((entry) => (
              <div key={entry.courseCode}>
                <CardHeader className="font-semibold text-blue-400">
                  {entry?.courseCode}
                </CardHeader>
                <CardBody className="space-y-2 text-sm">
                  <div>
                    <strong>Teacher</strong>: {entry.teacherCode}
                  </div>
                  <div>
                    <strong>Type</strong>: {entry.classType}
                  </div>
                  <div>
                    <strong>Venue</strong>: {entry.venue}
                  </div>
                  <div>
                    <strong>Batches</strong>: {entry.batches}
                  </div>
                </CardBody>
              </div>
            ))}
          </Card>
        );
      })}
    </div>
  );
}
