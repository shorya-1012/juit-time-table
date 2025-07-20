"use client";

import { Suspense } from "react";
import DeviceRouter from "./deviceRouter";
import Loading from "../loading";

export default function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <DeviceRouter />
    </Suspense>
  );
}
