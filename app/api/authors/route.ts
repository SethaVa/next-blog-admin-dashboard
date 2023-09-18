import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { photo, name, bio, isPublished } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!photo) {
      return new NextResponse("Photo is required", { status: 400 });
    }

    if (!bio) {
      return new NextResponse("Bio is required", { status: 400 });
    }

    const author = await prismadb.author.create({
      data: {
        name,
        photo,
        bio,
        isPublished,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[ERROR_POST_AUTHOR]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const authors = await prismadb.author.findMany();

    return NextResponse.json(authors);
  } catch (error) {
    console.log("[ERROR_GET_AUTHORS]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
