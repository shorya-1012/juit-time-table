import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { read } from "xlsx";
import parser from "./parser";
import { modelMap } from "@/database/modal";
import connectDB from "@/database/db";

export async function PUT(request: NextRequest) {
  const { password } = await request.json();
  if (password != process.env.UPDATE_KEY)
    return NextResponse.json({ error: "Invalid Password" }, { status: 401 });

  try {
    // WARNING :: You might have some reabilty issues down the path
    const res = await axios.get(
      process.env.NEXT_PUBLIC_TIMETABLE_URL as string,
      { responseType: "arraybuffer" },
    );
    const fileBuffer = Buffer.from(res.data);
    const workbook = read(fileBuffer, { type: "buffer" });
    await connectDB();

    workbook.SheetNames.forEach(async (sheetName, index) => {
      if (index === 0) return;
      const sheet = workbook.Sheets[sheetName];
      const records = parser(sheet);
      const model = modelMap[sheetName as keyof typeof modelMap];
      await model.deleteMany();
      await model.insertMany(records).catch((error) => {
        throw new Error(`Database insert error: ${error.message}`);
      });
    });

    return NextResponse.json(
      { message: "Processing complete." },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An unexpected error occurred.", details: err },
      { status: 500 },
    );
  }
}
