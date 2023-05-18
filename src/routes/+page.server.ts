import { prisma } from "$lib/server/prisma"
import { error, fail } from "@sveltejs/kit"
import type { PageServerLoad, Actions } from "./$types"

export const load: PageServerLoad = async () => {
  return {
    articles: await prisma.article.findMany(),
  }
}

export const actions: Actions = {
  createArticle: async ({ request }) => {
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
      await prisma.article.create({
        data: {
          title,
          content,
        },
      })
    } catch (err) {
      console.log(err)
      return fail(500, { message: "Could not create the article." })
    }

    return {
      status: 201,
    }
  },

  deleteArticle: async ({ url }) => {
    const id = url.searchParams.get("id")

    if (!id) {
      return fail(400, { message: "Invalid request" })
    }

    try {
      await prisma.article.delete({
        where: {
          id: Number(id),
        },
      })
    } catch (err) {
      console.log(err)
      return fail(500, {
        message: "Something went wrong deleting your article",
      })
    }

    return {
      status: 200,
    }
  },
}
