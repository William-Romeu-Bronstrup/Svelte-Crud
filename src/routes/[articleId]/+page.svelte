<script lang="ts">
  import type { PageData } from "./$types"

  export let data: PageData

  $: ({ article } = data)
</script>

<div class={`w-[500px]`}>
  <form
    action="?/updateArticle"
    method="post"
    class={`flex flex-col text-[--title-white]`}
  >
    <label for="title" class={`mb-1`}>Editing: {article.title}</label>
    <input
      type="text"
      name="title"
      id="title"
      minlength="1"
      maxlength="200"
      value={article.title}
      class={`bg-transparent p-2 border-[--border-normal] border-[1.8px] rounded-md outline-none focus:border-[--border-focus]`}
    />

    <label for="content" class={`mb-1 mt-5`}>Description</label>
    <textarea
      name="content"
      id="content"
      rows="5"
      minlength="1"
      maxlength="500"
      value={article.content}
      class={`bg-transparent p-2 border-[--border-normal] border-[1.8px] rounded-md outline-none focus:border-[--border-focus] resize-none`}
    />

    <div class={`flex gap-2 h-min mt-5`}>
      <button
        type="submit"
        class={`text-[--border-focus] border-[--border-focus] border-[1.8px] rounded-sm p-2
        hover:bg-[--button-hover] hover:border-[--button-hover] hover:text-[--title-white] transition delay-75 flex-grow`}
        >Update Article
      </button>
      <a
        href="/"
        role="button"
        class={`text-[--border-normal] border-[--border-normal] border-[1.8px] rounded-sm p-2
        hover:bg-gray-400 hover:border-gray-400 hover:text-[--title-white] transition delay-75 flex-grow flex justify-center`}
        >Go Back</a
      >
    </div>
  </form>
</div>
