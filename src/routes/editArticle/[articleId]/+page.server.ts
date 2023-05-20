import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"
import { prisma } from "$lib/server/prisma"

export const load: PageServerLoad = async ({ params }) => {
  const getArticle = async () => {
    const article = await prisma.article.findUnique({
      where: {
        id: Number(params.articleId),
      },
    })

    if (!article) {
      throw error(404, "Article not found")
    }

    return article
  }

  return {
    article: getArticle(),
  }
}

export const actions: Actions = {
  updateArticle: async ({ request, params }) => {
    const { title, content } = Object.fromEntries(await request.formData()) as {
      title: string
      content: string
    }

    if (!title || !content) {
      return fail(400, {
        missing: true,
      })
    }

    try {
      await prisma.article.update({
        where: {
          id: Number(params.articleId),
        },
        data: {
          title,
          content,
        },
      })
    } catch (err) {
      throw error(500, { message: "Could not update article" })
    }

    return {
      status: 200,
    }
  },
}
