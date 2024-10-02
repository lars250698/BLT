<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'

const router = useRouter()

onMounted(() => {
  window.auth.logout()
  window.util.closeAllWindowsExceptMain()
  router.push('/login')
})
</script>

<template>
  <div class="w-full h-full bg-sky-950">
    <loading :active="true" :can-cancel="false" :is-full-page="true" />
  </div>
</template>

<style scoped></style>
