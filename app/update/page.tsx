"use client";

import { UpdatePageAlert } from "@/config/data";
import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Snippet } from "@heroui/snippet";
import { addToast } from "@heroui/toast";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password) {
      addToast({
        title: "Missing Password",
        color: "danger",
        description: "Please enter a password before submitting.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.put("/api/set", { password });
      console.log(res);

      addToast({
        color: "success",
        title: "Success",
        description: "Timetable updated successfully.",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      });

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
        size="sm"
        aria-label="Password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        className="max-w-md"
        type="password"
      />

      <Alert
        className="max-w-md"
        color="danger"
        title={UpdatePageAlert.title}
        description={UpdatePageAlert.description}
      />

      <Button isLoading={loading} type="submit" radius="full" color="primary">
        Set Timetable
      </Button>
    </form>
  );
}
