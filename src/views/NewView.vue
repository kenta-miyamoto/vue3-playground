<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function apply() {
  console.log('[NewView] apply route.name', route.name)
  if (route.name === 'fileSelect') {
    console.log('[NewView] apply route.name', route.name)
    router.push({ name: 'detailSetting' })
  } else if (route.name === 'detailSetting') {
    router.push({ name: 'fileSelect' })
  }
}

function cancel() {
  router.push({ name: 'fileSelect' })
}
</script>

<template>
  <main>
    <RouterView @apply="apply" @cancel="cancel" />
  </main>
</template>

<style></style>
