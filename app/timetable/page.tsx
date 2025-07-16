"use client";

import { Suspense } from "react";
import DeviceRouter from "./deviceRouter";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeviceRouter />
    </Suspense>
  );
}
