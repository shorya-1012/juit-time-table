"use client";

import { Button } from "@heroui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <Button onPress={reset} color="primary">
        Try again
      </Button>
    </div>
  );
}
