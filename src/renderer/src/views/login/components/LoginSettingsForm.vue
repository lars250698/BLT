<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ApplicationSettings } from '../../../../../shared/src/models/application-settings-models'

const appSettings = ref<ApplicationSettings>()

function resetSettings() {
  window.applicationSettings.reset()
  getSettings()
}

function updateSettings() {
  if (appSettings.value) {
    window.applicationSettings.set({ ...appSettings.value })
  }
}

function getSettings() {
  window.applicationSettings.get().then((settings) => {
    appSettings.value = settings
  })
}

onMounted(() => {
  getSettings()
})
</script>

<template>
  <div v-if="appSettings" class="flex flex-col w-1/3 justify-center">
    <div class="my-2">
      <label for="vportal-url" class="label">Vereinsportal URL</label>
      <input
        id="vportal-url"
        v-model="appSettings.vportalUrl"
        class="input"
        type="url"
        @change="updateSettings"
      />
    </div>
    <div class="my-2">
      <label for="login-proxy-url" class="label">Login Proxy URL (leave unchanged if unsure)</label>
      <input
        id="login-proxy-url"
        v-model="appSettings.loginProxyUrl"
        class="input"
        type="url"
        @change="updateSettings"
      />
    </div>
    <div class="my-2">
      <label for="api-port" class="label">API Port</label>
      <input
        id="api-port"
        v-model="appSettings.apiPort"
        class="input"
        type="number"
        @change="updateSettings"
      />
    </div>
    <div class="my-2">
      <button type="button" class="btn-secondary w-full" @click="resetSettings">
        Reset to defaults
      </button>
    </div>
  </div>
</template>

<style scoped>
.label {
  @apply block mb-2 text-sm font-medium text-white;
}

.input {
  @apply border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500;
}

.btn-primary {
  @apply text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800;
}

.btn-secondary {
  @apply border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700;
}
</style>
