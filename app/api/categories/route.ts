import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, isPublished } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        slug,
        isPublished,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[ERROR_POST_CATEGORY]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const categories = await prismadb.category.findMany();

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[ERROR_GET_CAGETORIES]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
