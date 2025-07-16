import { FullTimetableTable } from "@/components/full-timetable";
import { SmTimetable } from "@/components/sm-timetable";
import { useIsMobile } from "@/hooks/use-mobile";
import { DATA } from "@/hooks/use-timetable";

export default function DeviceRouter({
  batch,
  data,
}: {
  batch: string;
  data: DATA[] | undefined;
}) {
  const isMobile = useIsMobile();
  if (isMobile == undefined || data == undefined) return <div>Loading</div>;
  if (isMobile) {
    return <SmTimetable batch={batch} data={data} />;
  } else {
    return <FullTimetableTable batch={batch} data={data} />;
  }
}
