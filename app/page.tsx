"use client";
import { HomePageAlert, Courses } from "@/config/data";
import { Alert } from "@heroui/alert";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FormEvent, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "nextjs-toploader/app";

export default function Home() {
  const SEM = process.env.NEXT_PUBLIC_SEM;
  const router = useRouter();
  const [data, setData] = useState({
    course: "",
    batch: "",
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { course, batch } = data;
    let cleanBatch = batch.replace(/ /g, "").replace(/-/g, "").toUpperCase();

    const encodedBatch = encodeURIComponent(cleanBatch);
    const encodedCourse = encodeURIComponent(course);

    router.push(`/timetable?batch=${encodedBatch}&course=${encodedCourse}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
    >
      <h2 className="text-transparent text-5xl bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-800">
        Timetable
      </h2>
      <br />

      <Select
        isRequired
        description={SEM}
        size="sm"
        className="max-w-md"
        label="Select course"
        disabledKeys={Courses.filter((_, index) => {
          if (SEM === "ODD_SEM") {
            return index % 2 === 1; // disables EVEN indices?
          } else if (SEM === "EVEN_SEM") {
            return index % 2 === 0; // disables ODD indices?
          }
          return false;
        }).map((batch) => batch)}
        onChange={(e) =>
          setData((prev) => ({ ...prev, course: String(e.target.value) }))
        }
      >
        {Courses.map((course) => (
          <SelectItem key={course}>{course}</SelectItem>
        ))}
      </Select>

      <Input
        isRequired
        description="Eg: 23A13, 24C32"
        size="sm"
        aria-label="Batch"
        label="Enter Batch"
        onChange={(e) =>
          setData((prev) => ({ ...prev, batch: String(e.target.value) }))
        }
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        className="max-w-md"
        type="search"
      />

      <Button type="submit" radius="full" color="primary">
        Get Timetable
      </Button>
      <br />

      <Alert
        className="max-w-md"
        color="primary"
        title={HomePageAlert.title}
        description={HomePageAlert.description}
      />
    </form>
  );
}
