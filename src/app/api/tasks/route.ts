import { NextResponse } from "next/server";
import tasksData from "@/data/tasks.json";

export async function GET() {
  return NextResponse.json(tasksData);
}
