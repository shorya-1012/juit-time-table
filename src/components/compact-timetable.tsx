import { useCompactTimetable } from "@/hooks/use-timetable"
import { extractTimetableEntries } from "@/utils"
import { type CourseKey } from "@/utils/constants"
import { Card, CardHeader, CardBody } from "@heroui/card"

type Props = {
  course: CourseKey
  batch: string
}

export function CompactTimetable({ course, batch }: Props) {
  const { data, error, loading } = useCompactTimetable(course)

  if (loading)
    return <div className="text-default-500">Loading timetable…</div>
  if (error)
    return <div className="text-danger">{error}</div>
  if (!data) return null

  return (
    <div className="flex flex-col gap-4 pt-16 px-4">
      {data.map(ele => {
        const entry = extractTimetableEntries(batch, ele.data);
        return <Card key={`${ele.day}-${ele.time}`}>
          <CardHeader>
            {entry?.courseCode}
          </CardHeader>
          <CardBody className="space-y-2 text-sm">
            <div>Teacher: {entry.teacherCode}</div>
            <div>Course: {entry.courseCode}</div>
            <div>Type: {entry.classType}</div>
            <div>Venue: {entry.venue}</div>

            {entry.batches.length > 0 && (
              <div>
                Batches: {entry.batches.join(", ")}
              </div>
            )}
          </CardBody>
        </Card>
      })}
    </div>
  )
}

