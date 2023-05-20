<script lang="ts">
  import type { ActionData, PageData } from "./$types"

  export let data: PageData
  export let form: ActionData

  let value: string = ""

  $: ({ articles } = data)
</script>

<div class={`text-[--title-white]`}>
  <h2 class="text-2xl font-bold mb-8">Articles:</h2>

  <div class={`flex flex-col gap-2 mb-5`}>
    <label for="search" class={`font-semibold`}>Search</label>
    <div class={`flex gap-2`}>
      <input
        type="text"
        id="search"
        bind:value
        class={`outline-none border-2 border-[--border-normal] focus:border-blue-500 rounded-md bg-transparent p-2 flex-1`}
      />
      <a
        href="/searchArticle/{value}"
        role="button"
        class={`p-2 bg-[--button-normal] rounded-md font-semibold transition delay-75 hover:bg-[--button-hover]`}
      >
        Search
      </a>
    </div>
  </div>

  {#each articles as article}
    <article class="bg-[#171E27] rounded-sm mb-3">
      <p class={`bg-[#1B222D] p-5 mb-5 w-full`}>
        {article.title}
      </p>

      <div class={`px-5 pb-5`}>
        <p class={`mb-5`}>{article.content}</p>
        <div class={`flex flex-col gap-2 font-semibold w-full`}>
          <form action="?/deleteArticle&id={article.id}" method="POST">
            <button
              type="submit"
              class={`text-[--border-normal] border-[--border-normal] border-[1.8px] rounded-sm p-2
              hover:bg-red-500 hover:border-red-500 hover:text-[--title-white] transition delay-75 w-full`}
              >Delete Article</button
            >
          </form>

          <a
            href="editArticle/{article.id}"
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
</div>

<div>
  {#if form?.missing}
    <div class={`flex items-baseline justify-between mb-8`}>
      <h2 class={`text-[--title-white] text-2xl font-bold`}>New Article</h2>
      <p class={`text-red-400`}>* Please, complete the fields!</p>
    </div>
  {:else}
    <h2 class={`text-[--title-white] text-2xl font-bold mb-8`}>New Article</h2>
  {/if}

  <form
    action="?/createArticle"
    method="post"
    class={`flex flex-col text-[--title-white]`}
  >
    <label for="title" class={`mb-1`}>Title</label>
    <input
      type="text"
      name="title"
      id="title"
      minlength="1"
      maxlength="200"
      class={`bg-transparent p-2 border-[--border-normal] border-[1.8px] rounded-md outline-none focus:border-[--border-focus]`}
    />

    <label for="content" class={`mb-1 mt-5`}>Description</label>
    <textarea
      name="content"
      id="content"
      rows="5"
      minlength="1"
      maxlength="500"
      class={`bg-transparent p-2 border-[--border-normal] border-[1.8px] rounded-md outline-none focus:border-[--border-focus] resize-none`}
    />

    <button
      type="submit"
      class={`mt-5 p-2 bg-[--button-normal] rounded-sm font-semibold transition delay-75 hover:bg-[--button-hover]`}
      >Add Article</button
    >
  </form>
</div>
