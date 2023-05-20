<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData

  $: ({ articles } = data)
</script>

{#each articles as article}
  <article class="bg-[#171E27] rounded-sm mb-3">
    <p class={`bg-[#1B222D] p-5 mb-5 w-full`}>
      {article.title}
    </p>

    <div class={`px-5 pb-5`}>
      <p class={`mb-5`}>{article.content}</p>
      <div class={`flex flex-col gap-2 font-semibold w-full`}>
        <form action="/deleteArticle&id={article.id}" method="POST">
          <button
            type="submit"
            class={`text-[--border-normal] border-[--border-normal] border-[1.8px] rounded-sm p-2
              hover:bg-red-500 hover:border-red-500 hover:text-[--title-white] transition delay-75 w-full`}
            >Delete Article</button
          >
        </form>

        <a
          href="/editArticle/{article.id}"
          role="button"
          class={`text-[--border-focus] border-[--border-focus] border-[1.8px] rounded-sm p-2
              hover:bg-[--button-hover] hover:border-[--button-hover] hover:text-[--title-white] transition delay-75 flex justify-center`}
        >
          Edit Article
        </a>
      </div>
    </div>
  </article>
{:else}
  <p class={`text-[--subtitle]`}>No articles yet</p>
{/each}
