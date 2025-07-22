"use client";

import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { UpdatePageAlert } from "@/config/data";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Snippet } from "@heroui/snippet";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put("/api/set", { password });

      addToast({
        color: "success",
        title: "Success",
        description: "Timetable updated successfully.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      setTimeout(() => router.push("/"), 3000);

      setPassword("");
    } catch (err) {
      console.error(err);
      addToast({
        color: "danger",
        title: "Error",
        description: "Failed to update timetable.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
    >
      <Snippet
        color="primary"
        radius="sm"
        size="lg"
        className="max-md:whitespace-nowrap overflow-x-auto max-md:p-4 max-w-lg w-full"
      >
        {process.env.NEXT_PUBLIC_TIMETABLE_URL ?? "Not available"}
      </Snippet>

      <Input
        isRequired
        description="Please do not spam"
        type={isVisible ? "text" : "password"}
        size="sm"
        aria-label="Password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        endContent={
          <button
            aria-label="toggle password visibility"
            className="focus:outline-hidden"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        className="max-w-md"
      />

      <Alert
        className="max-w-md"
        color="danger"
        title={UpdatePageAlert.title}
        description={UpdatePageAlert.description}
      />

      <div className=" flex gap-2">
        <Button isLoading={loading} type="submit" radius="full" color="primary">
          Set Timetable
        </Button>
      </div>
    </form>
  );
}
