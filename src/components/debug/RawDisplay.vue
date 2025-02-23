<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  value?: string | number | object
}>()

const valueString = computed(() => {
  if (props.value === undefined) return 'undefined'
  return JSON.stringify(props.value, null, 2)
})
</script>

<template>
  <div>
    <h3>{{ title }}</h3>
    <pre>{{ valueString }}</pre>
  </div>
</template>

<style scoped>
pre {
  text-align: start;
}
</style>
