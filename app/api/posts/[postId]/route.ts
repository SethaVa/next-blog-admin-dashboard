import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    const deletedPost = await prismadb.post.delete({
      where: {
        id: params.postId,
      },
    });

    return NextResponse.json(deletedPost);
  } catch (error) {
    console.log("[ERROR_DELETE_POST]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("Post ID is required", { status: 400 });
    }

    const post = await prismadb.post.findUnique({
      where: {
        id: params.postId,
      },
      include: { categories: true, author: true },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.log("[ERROR_GET_POST_BY_ID]: ", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { postId: string } }
) {
  try {
    if (!params.postId) {
      return new NextResponse("Category ID is required", { status: 400 });
    }

    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      featuredImage,
      isFeaturePost,
      content,
      categoryIds,
      authorId,
    } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 });
    }

    if (!excerpt) {
      return new NextResponse("Excerpt is required", { status: 400 });
    }

    if (!featuredImage) {
      return new NextResponse("Feature image is required", { status: 400 });
    }

    if (!content) {
      return new NextResponse("Content is required", { status: 400 });
    }

    if (!categoryIds.length) {
      return new NextResponse("Categories is required", { status: 400 });
    }

    if (!authorId.length) {
      return new NextResponse("Author is required", { status: 400 });
    }

    const createdPost = await prismadb.post.update({
      where: {
        id: params.postId,
      },
      data: {
        title,
        slug,
        excerpt,
        featuredImage,
        isFeaturePost,
        content,
        categoryIds,
        authorId,
      },
    });

    return NextResponse.json(createdPost);
  } catch (error) {
    console.log("[ERROR_POST_AUTHOR]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
