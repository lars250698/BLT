<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUnmounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import Loading from 'vue-loading-overlay'
import { OpenNewStreamOverlayWindowProps } from '../../../../shared/src/props/util-props'
import {
  CompetitionGroup,
  ScoreboardType,
  StreamSettings
} from '../../../../shared/src/models/stream-settings-models'
import ScoreboardSettingsCard from './components/ScoreboardSettingsCard.vue'

const store = useStore()
const router = useRouter()
const streamSettings = ref<StreamSettings>()
const isLoading = ref<boolean>(false)
const individualScoreboardControl = ref(false)

const activeGroups = computed(() =>
  streamSettings.value?.availableGroups.filter((group: CompetitionGroup) =>
    streamSettings.value?.activeGroupIds.includes(group.id)
  )
)

const isMac = ref(false)

function openLowerThirds() {
  const r = router.resolve({ name: 'lower-thirds' })
  window.util.openNewStreamOverlayWindow(fixedWindow(r.href, 1500, 300))
}

function openScoreboard() {
  const r = router.resolve({ name: 'scoreboard' })
  window.util.openNewStreamOverlayWindow(fixedWindow(r.href, 1050, 630))
}

function fixedWindow(path: string, width: number, height: number) {
  return {
    path: path,
    width: width,
    height: height,
    minWidth: width,
    minHeight: height,
    maxWidth: width,
    maxHeight: height
  } as OpenNewStreamOverlayWindowProps
}

function logout() {
  router.push('/logout')
}

function updateSelectedScoreboardType() {
  store.commit('setSelectedScoreboardType', store.state.sharedState.selectedScoreboardType)
}

function syncScoreboardSettings() {
  if (!individualScoreboardControl.value) {
    window.streamSettings.syncScoreboardSettings().then(() => refreshSettings())
  }
}

function refreshSettings() {
  window.streamSettings.get().then((settings) => (streamSettings.value = settings))
}

onMounted(() => {
  window.util.getPlatform().then((res) => (isMac.value = res === 'darwin'))
  window.streamSettings.initialize().then((res) => (streamSettings.value = res))
  window.api.start()
})

onUnmounted(() => {
  window.api.stop()
})

onBeforeMount(() => {
  window.auth
    .isLoggedIn()
    .then((loggedIn) => {
      if (!loggedIn) {
        router.push('/login')
      }
    })
    .catch((err) => {
      console.error(err)
      router.push('/logout')
    })
})
</script>

<template>
  <div class="flex flex-col w-full h-full">
    <div class="flex flex-row h-full w-full max-h-screen">
      <div
        class="flex w-80 flex-col h-full p-4 bg-sky-950 text-white overflow-x-hidden overflow-y-auto"
        :class="{ 'pt-10': isMac }"
      >
        <div class="flex flex-col w-full h-full justify-between">
          <div class="flex flex-col">
            <h2 class="text-white">Gewichtsklassen</h2>
            <div class="py-4 pr-4">
              <div v-for="group in activeGroups" :key="group.id">
                <h3>{{ group.name }}</h3>
                <ul>
                  <li
                    v-for="category in group.bodyWeightCategories"
                    :key="category.id"
                    class="border-b border-gray-600 border-opacity-20 last:border-none py-1 text-gray-300 font-extralight"
                  >
                    {{ category.name }} ({{ category.ageCategoryName }})
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="flex">
          <button type="button" class="btn-secondary" @click="logout">Log out</button>
        </div>
      </div>

      <div
        class="flex flex-col flex-shrink justify-start w-full h-full p-4 overflow-x-hidden overflow-y-auto bg-gray-900 pt-8"
        v-if="streamSettings"
      >
        <loading v-model:active="isLoading" :can-cancel="false" :is-full-page="false" />
        <h2 class="text-xl text-white px-4">Athleteneinblendung</h2>

        <!-- Competition Stage Selection -->
        <div class="flex flex-row w-full justify-around">
          <div class="settings-card">
            <div class="flex-col w-1/2">
              <h3 class="pb-2">Plattform</h3>
              <select v-model="streamSettings.selectedCompetitionStageId" class="select">
                <option
                  v-for="stage in streamSettings.availableCompetitionStages"
                  :key="stage.id"
                  :value="stage.id"
                >
                  {{ stage.name }}
                </option>
              </select>
            </div>
          </div>
          <ScoreboardSettingsCard
            title="Scoreboard"
            :available-groups="streamSettings.availableGroups"
            :scoreboard-type="ScoreboardType.All"
            :scoreboard-settings="streamSettings.overallScoreboardSettings"
            :disabled="individualScoreboardControl"
            @change="refreshSettings"
          />
        </div>

        <!-- Scoreboard Settings -->
        <div class="flex flex-row w-full px-4 py-2">
          <label class="inline-flex items-center cursor-pointer">
            <input
              v-model="individualScoreboardControl"
              type="checkbox"
              class="sr-only peer"
              @change="syncScoreboardSettings"
            />
            <div
              class="relative w-11 h-6 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-800 rounded-full peer bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-blue-600"
            ></div>
            <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              >Individual Scoreboard Control</span
            >
          </label>
        </div>
        <div class="flex flex-col">
          <div v-if="individualScoreboardControl" class="w-full flex flex-col">
            <div class="w-full flex flex-row justify-around">
              <!-- Overall Scoreboard Settings -->
              <ScoreboardSettingsCard
                title="Overall"
                :available-groups="streamSettings.availableGroups"
                :scoreboard-type="ScoreboardType.Overall"
                :scoreboard-settings="streamSettings.overallScoreboardSettings"
              />

              <!-- Squat Scoreboard Settings -->
              <ScoreboardSettingsCard
                title="Squat"
                :available-groups="streamSettings.availableGroups"
                :scoreboard-type="ScoreboardType.Squat"
                :scoreboard-settings="streamSettings.squatScoreboardSettings"
              />
            </div>

            <div class="w-full flex flex-row justify-around">
              <!-- Bench Scoreboard Settings -->
              <ScoreboardSettingsCard
                title="Bench"
                :available-groups="streamSettings.availableGroups"
                :scoreboard-type="ScoreboardType.Bench"
                :scoreboard-settings="streamSettings.benchPressScoreboardSettings"
              />

              <!-- Deadlift Scoreboard Settings -->
              <ScoreboardSettingsCard
                title="Deadlift"
                :available-groups="streamSettings.availableGroups"
                :scoreboard-type="ScoreboardType.Deadlift"
                :scoreboard-settings="streamSettings.deadliftScoreboardSettings"
              />
            </div>
          </div>
          <div class="w-full flex flex-row justify-around py-4">
            <div class="flex flex-col w-96 py-4">
              <button type="button" class="btn-secondary" @click="openLowerThirds">
                Lower Thirds
              </button>
              <button type="button" class="btn-secondary" @click="openScoreboard">
                Scoreboard
              </button>
              <select
                v-model="store.state.sharedState.selectedScoreboardType"
                class="select w-full text-white"
                @change="updateSelectedScoreboardType"
              >
                <option :value="ScoreboardType.Overall">Overall</option>
                <option :value="ScoreboardType.Squat">Squat</option>
                <option :value="ScoreboardType.Bench">Benchpress</option>
                <option :value="ScoreboardType.Deadlift">Deadlift</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-card {
  @apply flex flex-col w-96 p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-md m-4 text-gray-300;
}

.select {
  @apply bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5;
}

.btn-secondary {
  @apply w-full border focus:outline-none focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700;
}
</style>
