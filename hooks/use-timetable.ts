import { DATA } from "@/types";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";

export function useTimetable(course: string | null, batch: string | null) {
  const [data, setData] = useState<DATA[]>();
  const router = useRouter();

  useEffect(() => {
    if (!course || !batch) {
      addToast({
        color: "danger",
        title: "Missing Data",
        description: "Please provide both course and batch.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

      setTimeout(() => {
        router.push("/");
      }, 3000);

      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.post("/api/get", { course });
        const data: DATA[] = response.data;
        setData(data);
      } catch (error) {
        addToast({
          color: "danger",
          title: "Error",
          description: "Failed to fetch timetable. Redirecting...",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });

        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    };
    fetchData();
  }, [course, batch]);

  data?.sort((a, b) => {
    const getStartTime = (t: string) => {
      const meridiem = t.split(" ").at(-1);
      const startTime = t.split(" - ")[0].trim();
      let [hours, mins] = startTime.split(" ")[0].split(":").map(Number);

      if (meridiem === "PM" && hours !== 12) {
        hours += 12;
      } else if (meridiem === "AM" && hours === 12) {
        hours = 0;
      }

      return hours * 60 + mins;
    };
    return getStartTime(a.time) - getStartTime(b.time);
  });

  return data;
}
