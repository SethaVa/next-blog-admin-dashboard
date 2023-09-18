import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const categories = await prismadb.category.findMany({
      select: {
        name: true,
        slug: true,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[ERROR_GET_CAGETORIES_FRONT]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
