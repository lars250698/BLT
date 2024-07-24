<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue'
import {
  AttemptStatus,
  ScoreboardEntryDeadlift,
  ScoreboardEntrySquat
} from '../../../../../shared/src/models/vportal-models'
import { prettyPrintLot, prettyPrintWeight } from '../../../../../shared/src/util/pretty-print'
import { padToSize } from '../../../../../shared/src/util/array-utils'
import FadeOutIn from '../../../components/transitions/FadeOutIn.vue'

interface ScoreboardEntry {
  name: string
  lot: string
  bodyWeight: string
  total: string
  prognosis: string
  attempt1: string
  attempt2: string
  attempt3: string
  attemptStatus1: AttemptStatus
  attemptStatus2: AttemptStatus
  attemptStatus3: AttemptStatus
}

const emptyLine: ScoreboardEntry = {
  name: '',
  lot: '',
  bodyWeight: '',
  total: '',
  prognosis: '',
  attempt1: '',
  attempt2: '',
  attempt3: '',
  attemptStatus1: AttemptStatus.Open,
  attemptStatus2: AttemptStatus.Open,
  attemptStatus3: AttemptStatus.Open
}

const athletes = ref<Array<ScoreboardEntry>>(Array(14).fill(emptyLine))

let interval: ReturnType<typeof setTimeout> | undefined = undefined

function getAthletes() {
  window.streamData.getSquatScoreboard().then((entries) => {
    window.streamSettings.get().then((settings) => {
      const mapped = entries.map((entry) => mapScoreboardEntry(entry))
      athletes.value = padToSize(mapped, emptyLine, settings.squatScoreboardSettings.pageSize)
    })
  })
}

function attemptClass(status: AttemptStatus) {
  switch (status) {
    case AttemptStatus.Invalid:
      return 'invalid'
    case AttemptStatus.Valid:
      return 'valid'
    default:
      return ''
  }
}

function mapScoreboardEntry(scoreboardEntry: ScoreboardEntrySquat): ScoreboardEntry {
  return {
    name: `${scoreboardEntry.firstName} ${scoreboardEntry.lastName}`,
    lot: prettyPrintLot(scoreboardEntry.lot),
    bodyWeight: prettyPrintWeight(scoreboardEntry.bodyweight),
    total: prettyPrintWeight(scoreboardEntry.total),
    prognosis: prettyPrintWeight(scoreboardEntry.prognosis, ''),
    attempt1: prettyPrintWeight(scoreboardEntry.attempt1),
    attempt2: prettyPrintWeight(scoreboardEntry.attempt2),
    attempt3: prettyPrintWeight(scoreboardEntry.attempt3),
    attemptStatus1: scoreboardEntry.attemptStatus1,
    attemptStatus2: scoreboardEntry.attemptStatus2,
    attemptStatus3: scoreboardEntry.attemptStatus3
  } as ScoreboardEntry
}

onBeforeMount(() => {
  getAthletes()
  interval = setInterval(getAthletes, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div class="flex flex-col w-full gradient h-8">
    <div class="flex flex-row w-full h-full px-2 justify-between text-white">
      <div class="flex flex-row justify-between w-5/6">
        <div class="flex flex-row justify-start w-3/5">
          <div class="mx-1 flex items-center flex-row justify-center w-6">#</div>
          <div class="mx-1 flex items-center flex-row justify-center w-16">Gew.</div>
          <div class="mx-1 flex items-center flex-row justify-center w-10">Lot</div>
          <div class="mx-1 flex items-center flex-row justify-start w-96">Name</div>
        </div>
        <div class="flex flex-row justify-end w-2/5">
          <div class="px-2 flex flex-row items-center justify-center w-16">KB1</div>
          <div class="px-2 flex flex-row items-center justify-center w-16">KB2</div>
          <div class="px-2 flex flex-row items-center justify-center w-16">KB3</div>
        </div>
      </div>
      <div class="flex flex-row justify-end w-36 items-center">
        <div class="mr-2 flex flex-row justify-center w-16">Total</div>
        <div class="ml-2 flex flex-row justify-center w-16">Prog.</div>
      </div>
    </div>
  </div>

  <div
    v-for="(athlete, idx) in athletes"
    :key="idx"
    class="flex flex-col w-full h-8 even:bg-gray-700 odd:bg-gray-500 opacity-80"
  >
    <FadeOutIn>
      <div
        :key="athlete.name"
        class="flex flex-row w-full h-full px-2 justify-between text-white items-center"
      >
        <div class="flex flex-row justify-between w-5/6 h-full items-center">
          <div class="flex flex-row justify-start w-3/5 h-full items-center">
            <div v-if="athlete.name" class="mx-1 flex flex-row justify-center w-6">
              {{ idx + 1 }}
            </div>
            <div v-else class="mx-1 flex flex-row justify-center w-6"></div>
            <div class="mx-1 flex flex-row h-full items-center justify-center w-16">
              {{ athlete.bodyWeight }}
            </div>
            <div class="mx-1 flex flex-row h-full items-center justify-center w-10">
              {{ athlete.lot }}
            </div>
            <div class="mx-1 flex flex-row h-full items-center justify-start w-96">
              {{ athlete.name }}
            </div>
          </div>
          <div class="flex flex-row justify-end w-2/5 h-full items-center">
            <div
              class="px-2 flex flex-row h-full items-center justify-center w-16 attempt"
              :class="attemptClass(athlete.attemptStatus1)"
            >
              {{ athlete.attempt1 }}
            </div>
            <div
              class="px-2 flex flex-row h-full items-center justify-center w-16 attempt"
              :class="attemptClass(athlete.attemptStatus2)"
            >
              {{ athlete.attempt2 }}
            </div>
            <div
              class="px-2 flex flex-row h-full items-center justify-center w-16 attempt"
              :class="attemptClass(athlete.attemptStatus3)"
            >
              {{ athlete.attempt3 }}
            </div>
          </div>
        </div>
        <div class="flex flex-row justify-end w-36 h-full items-center">
          <div class="mr-2 flex flex-row justify-center w-16">{{ athlete.total }}</div>
          <div class="ml-2 flex flex-row justify-center w-16">{{ athlete.prognosis }}</div>
        </div>
      </div>
    </FadeOutIn>
  </div>
</template>

<style scoped>
.attempt {
  transition: background-color 0.5s ease;
}

.valid {
  @apply bg-green-500;
}

.invalid {
  @apply bg-red-500;
}
</style>
