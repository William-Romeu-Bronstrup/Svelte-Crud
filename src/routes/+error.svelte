<script>
  import { page } from "$app/stores"
</script>

<h1 class={`text-red-600`}>
  {$page.status}: {$page.error?.message}
</h1>

<style>
  h1 {
    color: red;
  }
</style>
