<script lang="ts">
  interface Props {
    initialCount: number
  }

  let { initialCount = 0 }: Props = $props()

  let count = $state(initialCount)
</script>

<h1>Home {count}</h1>

<button onclick={() => count++}>Click me</button>
