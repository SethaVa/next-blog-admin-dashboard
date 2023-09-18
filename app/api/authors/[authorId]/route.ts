import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    if (!params.authorId) {
      return new NextResponse("Author ID is required", { status: 400 });
    }

    const author = await prismadb.author.findUnique({
      where: {
        id: params.authorId,
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    console.log("[ERROR_GET_AUTHOR]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    if (!params.authorId) {
      return new NextResponse("Author ID is required", { status: 400 });
    }

    const body = await request.json();
    const { name, photo, bio, isPublished } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!photo) {
      return new NextResponse("Photo is required", { status: 400 });
    }

    if (!bio) {
      return new NextResponse("Bio is required", { status: 400 });
    }

    const updatedAuthor = await prismadb.author.update({
      where: {
        id: params.authorId,
      },
      data: {
        name,
        photo,
        bio,
        isPublished,
      },
    });

    return NextResponse.json(updatedAuthor);
  } catch (error) {
    console.log("[ERROR_UPDATE_AUTHOR]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { authorId: string } }
) {
  try {
    if (!params.authorId) {
      return new NextResponse("Author ID is required", { status: 400 });
    }

    const deletedAuthor = await prismadb.author.delete({
      where: {
        id: params.authorId,
      },
    });

    return NextResponse.json(deletedAuthor);
  } catch (error) {
    console.log("[ERROR_DELETE_AUTHOR]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
