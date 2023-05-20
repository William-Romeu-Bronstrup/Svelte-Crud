import { fail } from "@sveltejs/kit"
import { prisma } from "$lib/server/prisma"
import type { PageServerLoad } from "./$types"

export const load: PageServerLoad = async ({ params }) => {
  const searchArticles = async () => {
    if (!params.search) {
      return fail(500, { message: "No query Provided" })
    }

    const articles = await prisma.article.findMany({
      where: {
        title: {
          contains: `${params.search}`,
        },
      },
    })

    console.log(articles)

    return articles
  }

  return {
    articles: searchArticles(),
  }
}
