import { FullTimetableTable } from "@/components/full-timetable";
import { SmTimetable } from "@/components/sm-timetable";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTimetable } from "@/hooks/use-timetable";
import { useSearchParams } from "next/navigation";
import Loading from "../loading";

export default function DeviceRouter() {
  const searchParams = useSearchParams();
  const params = {
    course: searchParams.get("course")!,
    batch: searchParams.get("batch")!,
    minor: searchParams.get("minor"),
  };
  const data = useTimetable(params.course, params.batch);
  // console.log(data);

  const isMobile = useIsMobile();
  if (isMobile == undefined || data == undefined) return <Loading />;

  if (isMobile) return <SmTimetable {...params} data={data} />;
  return <FullTimetableTable {...params} data={data} />;
}
