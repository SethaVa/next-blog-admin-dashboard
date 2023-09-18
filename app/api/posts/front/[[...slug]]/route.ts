import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { slug: any } }
) {
  try {
    const slug = params.slug;
    const firstParam = slug[0];
    switch (firstParam) {
      case "get-posts":
        const posts = await prismadb.post.findMany({
          include: { categories: true, author: true },
        });

        return NextResponse.json(posts);
      case "get-featured-posts":
        const featuredPosts = await prismadb.post.findMany({
          where: { isFeaturePost: true },
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            featuredImage: true,
            isFeaturePost: true,
            content: true,
            categoryIds: true,
            author: {
              select: {
                name: true,
                photo: true,
              },
            },
          },
        });

        return NextResponse.json(featuredPosts);
      case "get-recent-posts":
        const recentPosts = await prismadb.post.findMany({
          where: { isFeaturePost: true },
          select: {
            title: true,
            slug: true,
            createdAt: true,
            featuredImage: true,
          },
        });

        return NextResponse.json(recentPosts);
      case "get-related-posts":
        const postSlug = slug[1];
        const categorySlugs = slug[2].split(",");

        const relatedPosts = await prismadb.post.findMany({
          where: {
            AND: {
              slug: {
                not: postSlug,
              },
              categories: {
                every: {
                  slug: {
                    in: categorySlugs,
                  },
                },
              },
            },
          },
        });

        return NextResponse.json(relatedPosts);
      case "get-post-by-category-slug":
        const categorySlug = slug[1];
        const postByCategoryId = await prismadb.post.findMany({
          where: {
            categories: {
              every: {
                slug: categorySlug,
              },
            },
          },
          include: { categories: true, author: true },
        });

        return NextResponse.json(postByCategoryId);
      case "get-post-by-author-id":
        const authorId = slug[1];
        const postByAuthorId = await prismadb.post.findMany({
          where: {
            authorId: authorId,
          },
          include: { categories: true, author: true },
        });

        return NextResponse.json(postByAuthorId);
    }
  } catch (error) {
    console.log("[ERROR_GET_FEATURE_POST_FRONT]: ", error);
    return NextResponse.json("Internal error", { status: 500 });
  }
}
