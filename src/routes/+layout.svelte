<script>
  import "../app.postcss"
</script>

<div class="pt-2 px-72">
  <header class={`mb-4`}>
    <h1 class={`text-[--title-blue] text-3xl font-bold`}>SvelteKit & Prisma</h1>
    <span class={`text-[--subtitle]`}>
      Let's build a basic CRUD application with SvelteKit & Prisma
    </span>
  </header>

  <main class={`grid auto-cols-auto grid-cols-2 gap-4 w-full`}>
    <slot />
  </main>
</div>
