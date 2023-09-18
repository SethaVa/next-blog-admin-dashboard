import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[ERROR_GET_CATEGORY]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const body = await request.json();
    const { name, slug, isPublished } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    const updatedCategory = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        slug,
        isPublished,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.log("[ERROR_UPDATE_CATEGORY]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const deletedCategory = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(deletedCategory);
  } catch (error) {
    console.log("[ERROR_DELETE_CATEGORY]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
