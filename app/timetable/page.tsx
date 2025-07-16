"use client";

import { DATA, useTimetable } from "@/hooks/use-timetable";
import { useSearchParams } from "next/navigation";
import DeviceRouter from "./deviceRouter";

export default function Timetable() {
  const searchParams = useSearchParams();

  const course = searchParams.get("course");
  const batch = searchParams.get("batch");
  const data = useTimetable(course, batch);
  console.log(course, batch, data);
  return <DeviceRouter batch={batch || ""} data={data as DATA[]} />;
}
