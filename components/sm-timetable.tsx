import { useState } from "react";
import { Days } from "@/config/data";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { findClassForBatch } from "@/lib/utils";
import { DATA } from "@/types";

// EVEN IDK WTF I've WRITEN

export function SmTimetable({ batch, data }: { batch: string; data: DATA[] }) {
  const [selectedDay, setSelectedDay] = useState(() => {
    const now = new Date();
    let jsDayIndex = now.getDay();

    if (jsDayIndex === 0) jsDayIndex = 1;
    if (now.getHours() >= 18) jsDayIndex += 1;
    if (jsDayIndex === 0 || jsDayIndex > 6) jsDayIndex = 1;

    return Days[jsDayIndex - 1];
  });

  // console.log(data);

  const todaySchedule = data.filter((entry) => entry.day === selectedDay);

  const typeColors = {
    Lecture: "border-blue-500",
    Practical: "border-green-500",
    Tutorial: "border-yellow-500",
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Select
        onChange={(e) => setSelectedDay(e.target.value)}
        aria-label="Select day"
        label="Select Day"
        placeholder={selectedDay}
      >
        {Days.map((day) => (
          <SelectItem key={day}>{day}</SelectItem>
        ))}
      </Select>

      {todaySchedule.map((entry) => {
        const classInfo = findClassForBatch(entry.data, batch);

        if (!classInfo) {
          return (
            <Card
              radius="lg"
              key={entry._id}
              className="max-w-md w-full border-l-red-500 border-l-4"
            >
              <CardHeader>{entry.time}</CardHeader>
              <CardBody>No class scheduled for this batch.</CardBody>
            </Card>
          );
        }

        return (
          <Card
            radius="lg"
            key={entry._id}
            className={`max-w-md w-full shadow-md rounded-lg overflow-hidden border-l-4 ${typeColors[classInfo.type]}`}
          >
            <CardHeader className="flex justify-between items-center text-gray-800 dark:text-gray-200">
              <span className="text-lg font-semibold">{entry.time}</span>
              <span className="text-sm font-bold">{classInfo.courseCode}</span>
            </CardHeader>
            <CardBody className="text-gray-800 dark:text-gray-300 space-y-1">
              <p>
                <strong>Type:</strong>{" "}
                <span className="capitalize">
                  {classInfo.type} {classInfo.type === "Lecture" && "📘"}
                  {classInfo.type === "Practical" && "🧪"}
                  {classInfo.type === "Tutorial" && "📝"}
                </span>
              </p>
              <p>
                <strong>Batches:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {classInfo.batches.join(", ")}
                </span>
              </p>
              <p>
                <strong>Coordinator:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {classInfo.coordinator}
                </span>
              </p>
              <p>
                <strong>Venue:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {classInfo.venue}
                </span>
              </p>
            </CardBody>
          </Card>
        );
      })}
    </section>
  );
}
