import { addToast } from "@heroui/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type DATA = {
  data: string[];
  day: string;
  time: string;
  __v: number;
  _id: number;
};

export function useTimetable(course: string | null, batch: string | null) {
  const [data, setData] = useState<DATA[]>();
  const router = useRouter();

  useEffect(() => {
    if (!course || !batch) {
      addToast({
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
        console.log(data, "Here");
        setData(data);
      } catch (error) {
        addToast({
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

  return data;
}
