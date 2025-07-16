import { FullTimetableTable } from "@/components/full-timetable";
import { SmTimetable } from "@/components/sm-timetable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTimetable } from "@/hooks/use-timetable";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

export default function DeviceRouter() {
  const searchParams = useSearchParams();

  const course = searchParams.get("course");
  const batch = searchParams.get("batch");

  const data = useTimetable(course, batch);

  const isMobile = useIsMobile();
  if (isMobile == undefined || data == undefined) return <Loading />;
  if (!batch || !course) return "Batch or Course not found";

  if (isMobile) {
    return <SmTimetable batch={batch} data={data} />;
  } else {
    return <FullTimetableTable batch={batch} data={data} />;
  }
}
