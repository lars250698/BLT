<script setup lang="ts">
import Loading from 'vue-loading-overlay'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { Credentials, LoginProps } from '../../../../../shared/src/props/auth-props'
import { ScoreboardType } from '../../../../../shared/src/models/stream-settings-models'

const router = useRouter()
const toast = useToast()

const input = ref({
  identity: '',
  credential: ''
} as Credentials)
const saveCredentials = ref(false)
const isLoading = ref(false)

function login() {
  isLoading.value = true
  window.auth
    .login({
      credentials: { ...input.value },
      saveLogin: saveCredentials.value
    } as LoginProps)
    .then(onLoggedIn)
    .catch((err) => {
      isLoading.value = false
      if (err?.response?.status === 401) {
        toast.error('Wrong login data!')
      } else {
        toast.error('An error occurred during login.')
      }
      console.error(err)
    })
}

function onLoggedIn() {
  isLoading.value = false
  router.push('/options')
}

onMounted(() => {
  window.auth.savedCredentialsAvailable().then((savedCredentialsAvailable) => {
    isLoading.value = true
    if (savedCredentialsAvailable) {
      window.auth
        .loginWithSavedCredentials()
        .then(onLoggedIn)
        .catch((err) => {
          toast.error('An error occurred while trying to log in')
          console.error(err)
          input.value = {
            identity: '',
            credential: ''
          }
        })
    }
  })
})
</script>

<template>
  <loading
    v-model:active="isLoading"
    :can-cancel="false"
    :is-full-page="true"
    :opacity="1"
    :background-color="'#082f49'"
    :color="'#9ca3af'"
  />
  <div class="w-1/3 p-4 h-full flex flex-col justify-center">
    <form class="flex flex-col">
      <div class="my-2">
        <label for="username" class="label"> Username </label>
        <input
          id="username"
          v-model="input.identity"
          type="text"
          class="input"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="my-2">
        <label for="password" class="label"> Password </label>
        <input
          id="password"
          v-model="input.credential"
          type="password"
          class="input"
          placeholder="Enter your password"
          required
        />
      </div>
      <div class="flex items-center my-2">
        <input
          id="save-login"
          v-model="saveCredentials"
          type="checkbox"
          class="w-4 h-4 text-blue-600 rounded focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
        />
        <label for="save-login" class="ms-2 text-sm font-medium text-gray-300">Save login</label>
      </div>
      <div class="my-4">
        <button type="button" class="btn-primary w-full" @click.prevent="login">Log In</button>
      </div>
    </form>
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
