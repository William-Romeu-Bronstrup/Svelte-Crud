import { error, fail, redirect } from "@sveltejs/kit"
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
      throw error(500, {
        message: "Please fill all the blanks!",
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
      return fail(500, { message: "Could not update article" })
    }

    return {
      status: 200,
    }
  },
}
