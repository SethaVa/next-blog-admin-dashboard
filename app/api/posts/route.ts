import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
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

    const createdPost = await prismadb.post.create({
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

export async function GET(request: Request) {
  try {
    const posts = await prismadb.post.findMany({
      include: { categories: true, author: true },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("[ERROR_GET_AUTHORS]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
