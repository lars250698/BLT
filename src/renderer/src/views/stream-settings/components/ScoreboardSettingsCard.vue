<script setup lang="ts">
import {
  CompetitionGroup,
  ScoreboardSettings,
  ScoreboardType
} from '../../../../../shared/src/models/stream-settings-models'
import {
  SetScoreboardPageProps,
  SetScoreboardPageSizeProps,
  SetScoreboardSelectedBodyWeightCategoryProps
} from '../../../../../shared/src/props/stream-settings-props'
import { computed, PropType, toRef } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  scoreboardSettings: { type: Object as PropType<ScoreboardSettings>, required: true },
  scoreboardType: { type: Object as PropType<ScoreboardType>, required: true },
  availableGroups: { type: Object as PropType<Array<CompetitionGroup>>, required: true },
  disabled: { type: Boolean, required: false, default: false }
})
const scoreboardSettings = toRef(() => props.scoreboardSettings)
const availableGroups = toRef(() => props.availableGroups)

const availablePages = computed(() =>
  Array.from({ length: scoreboardSettings.value.availablePages }, (_, i) => i + 1)
)

function updateScoreboardPage() {
  window.streamSettings.setScoreboardPage({
    scoreboardType: props.scoreboardType,
    page: scoreboardSettings.value.page
  } as SetScoreboardPageProps)
}

function updateScoreboardPageSize() {
  window.streamSettings.setScoreboardPageSize({
    scoreboardType: props.scoreboardType,
    pageSize: scoreboardSettings.value.pageSize
  } as SetScoreboardPageSizeProps)
}

function updateScoreboardSelectedBodyWeightCategory() {
  window.streamSettings.setScoreboardSelectedBodyWeightCategory({
    scoreboardType: props.scoreboardType,
    bodyWeightCategory: scoreboardSettings.value.selectedBodyWeightCategoryId
  } as SetScoreboardSelectedBodyWeightCategoryProps)
}
</script>

<template>
  <div class="settings-card">
    <h3>{{ props.title }}</h3>
    <div class="flex flex-row my-2">
      <div class="mr-2 w-2/3">
        <select
          v-model="scoreboardSettings.selectedBodyWeightCategoryId"
          class="select"
          :disabled="disabled"
          @change="updateScoreboardSelectedBodyWeightCategory()"
        >
          <template v-for="group in availableGroups">
            <option
              v-for="category in group.bodyWeightCategories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }} ({{ category.ageCategoryName }})
            </option>
          </template>
        </select>
      </div>
      <div class="mr-2 w-14">
        <select
          v-model="scoreboardSettings.page"
          class="select"
          :disabled="disabled"
          @change="updateScoreboardPage()"
        >
          <option v-for="page in availablePages" :key="page" :value="page">
            {{ page }}
          </option>
        </select>
      </div>
      <div class="w-14">
        <input
          v-model="scoreboardSettings.pageSize"
          class="input"
          type="number"
          :disabled="disabled"
          @change="updateScoreboardPageSize()"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.input {
  @apply border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500;
}

.settings-card {
  @apply flex flex-col w-96 p-4 rounded-lg bg-gray-800 border border-gray-700 shadow-md m-4 text-gray-300;
}

.select {
  @apply bg-gray-700 border border-gray-600 placeholder-gray-400 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5;
}
</style>
