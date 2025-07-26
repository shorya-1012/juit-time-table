"use client";
import {
  HomePageAlert,
  Courses,
  ElectiveSubjects,
  ELECTIVE_SUBJECTS,
  ElectiveSubjectsRequest,
} from "@/config/data";
import { Alert } from "@heroui/alert";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { FormEvent, useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "nextjs-toploader/app";

type INPUT_DATA = {
  course: string;
  batch: string;
  minor: string | null;
};

export default function Home() {
  const SEM = process.env.NEXT_PUBLIC_SEM;
  const router = useRouter();
  const [data, setData] = useState<INPUT_DATA>({
    course: "",
    batch: "",
    minor: null,
  });
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { course, batch, minor } = data;
    let cleanBatch = batch.replace(/ /g, "").replace(/-/g, "").toUpperCase();

    const encodedBatch = encodeURIComponent(cleanBatch);
    const encodedCourse = encodeURIComponent(course);
    const encodedMinor = encodeURIComponent(minor ?? "");

    router.push(
      `/timetable?batch=${encodedBatch}&course=${encodedCourse}&minor=${encodedMinor}`,
    );
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
      {data.course && ["5", "6", "7", "8"].includes(data.course.charAt(6)) ? (
        <Select
          size="sm"
          isRequired={
            ElectiveSubjects[data.course as ELECTIVE_SUBJECTS].length > 0
              ? true
              : false
          }
          className="max-w-md"
          label="Elective Courses"
          description={"Minor subjects(3rd and 4th year)"}
          onChange={(e) =>
            setData((prev) => ({ ...prev, minor: e.target.value as any }))
          }
        >
          {ElectiveSubjects[data.course as ELECTIVE_SUBJECTS].map((ele) => (
            <SelectItem key={ele}>{ele}</SelectItem>
          ))}
        </Select>
      ) : (
        <Input
          disabled
          description="Minor subjects(3rd and 4th year)"
          className="max-w-md"
          label="Elective Courses"
        />
      )}

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

      <Alert
        className="max-w-md"
        color="warning"
        title={ElectiveSubjectsRequest.title}
        description={ElectiveSubjectsRequest.description}
      />
    </form>
  );
}
