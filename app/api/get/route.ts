import connectDB from "@/database/db";
import { modelMap } from "@/database/modal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { course } = await req.json();
  try {
    await connectDB();
    const model = modelMap[course as keyof typeof modelMap];
    const timetableEntries = await model.find().lean();

    return NextResponse.json(timetableEntries);
  } catch (err) {
    return NextResponse.json(
      { error: "An unexpected error occurred.", details: err },
      { status: 500 },
    );
  }
}
