<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue'
import TransparentWindowControls from '../../components/TransparentWindowControls.vue'
import { AthleteAttempt, AttemptStatus } from '../../../../shared/src/models/vportal-models'
import { prettyPrintLift, prettyPrintWeight } from '../../../../shared/src/util/pretty-print'
import FadeOutIn from '../../components/transitions/FadeOutIn.vue'

interface AthleteData {
  name: string
  club: string
  activeLift: string
  compClass: string
  total: string
  prognosis: string
  placement: string
  bestSquat: string
  bestBench: string
  bestDeadlift: string
  attempt1: string
  attempt2: string
  attempt3: string
  attemptStatus1: AttemptStatus
  attemptStatus2: AttemptStatus
  attemptStatus3: AttemptStatus
}

const athlete = ref<AthleteData>({
  name: '',
  club: '',
  activeLift: '',
  compClass: '',
  total: '',
  prognosis: '',
  placement: '',
  bestSquat: '',
  bestBench: '',
  bestDeadlift: '',
  attempt1: '',
  attempt2: '',
  attempt3: '',
  attemptStatus1: AttemptStatus.Open,
  attemptStatus2: AttemptStatus.Open,
  attemptStatus3: AttemptStatus.Open
})

let interval: ReturnType<typeof setTimeout> | undefined = undefined

function getAthlete() {
  window.streamData.getActiveAthleteAttempt().then((res) => {
    athlete.value = mapAthleteData(res)
  })
}

function mapAthleteData(data: AthleteAttempt): AthleteData {
  return {
    name: `${data.firstName} ${data.lastName}`,
    club: data.clubName,
    activeLift: prettyPrintLift(data.activeLift),
    compClass: data.compClass,
    total: prettyPrintWeight(data.total, '-'),
    prognosis: prettyPrintWeight(data.prognosis, ''),
    placement: data.placement?.toString() ?? '-',
    bestSquat: prettyPrintWeight(data.bestSquat, '0'),
    bestBench: prettyPrintWeight(data.bestBenchPress, '0'),
    bestDeadlift: prettyPrintWeight(data.bestDeadlift, '0'),
    attempt1: prettyPrintWeight(data.attempt1),
    attempt2: prettyPrintWeight(data.attempt2),
    attempt3: prettyPrintWeight(data.attempt3),
    attemptStatus1: data.attemptStatus1,
    attemptStatus2: data.attemptStatus2,
    attemptStatus3: data.attemptStatus3
  } as AthleteData
}

function attemptClass(status: AttemptStatus) {
  switch (status) {
    case AttemptStatus.Invalid:
      return 'attempt-fail'
    case AttemptStatus.Valid:
      return 'attempt-success'
    default:
      return ''
  }
}

onBeforeMount(() => {
  getAthlete()
  interval = setInterval(getAthlete, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div
    class="flex flex-col justify-center align-middle w-full h-full content-center items-center bg-opacity-0"
  >
    <TransparentWindowControls />
    <div id="container">
      <div class="flex flex-row rounded-lg w-full h-full px-4 py-2 gradient">
        <div class="flex flex-row w-1/2">
          <div class="flex flex-col justify-around text-white h-full w-full py-2">
            <div class="text-3xl">
              <FadeOutIn>
                <span :key="athlete.name" class="ellipses">{{ athlete.name }}</span>
              </FadeOutIn>
            </div>
            <div class="text-xl font-light">
              <FadeOutIn>
                <span :key="athlete.name" class="ellipses">{{ athlete.club }}</span>
              </FadeOutIn>
            </div>
            <div class="text-xl font-light">
              <FadeOutIn>
                <span :key="athlete.name" class="ellipses">{{ athlete.compClass }}</span>
              </FadeOutIn>
            </div>
          </div>
        </div>
        <div class="flex flex-row items-center w-2/3 justify-around">
          <div class="flex flex-row justify-end justify-items-end">
            <div
              :key="athlete.activeLift"
              id="current-lift-name"
              class="bg-white rounded-lg p-2 font-bold flex justify-center items-center text-xl w-40 h-11 mx-1"
            >
              <FadeOutIn>
                <span>{{ athlete.activeLift }}</span>
              </FadeOutIn>
            </div>
            <div class="flex flex-row">
              <div
                id="attempt-one"
                class="bg-white rounded-lg p-2 font-bold flex justify-center items-center text-xl w-16 h-11 mx-1 attempt"
                :class="attemptClass(athlete.attemptStatus1)"
              >
                <FadeOutIn>
                  <span :key="athlete.name">{{ athlete.attempt1 }}</span>
                </FadeOutIn>
              </div>
              <div
                id="attempt-two"
                class="bg-white rounded-lg p-2 font-bold flex justify-center items-center text-xl w-16 h-11 mx-1 attempt"
                :class="attemptClass(athlete.attemptStatus2)"
              >
                <FadeOutIn>
                  <span :key="athlete.name">{{ athlete.attempt2 }}</span>
                </FadeOutIn>
              </div>

              <div
                id="attempt-three"
                class="bg-white rounded-lg p-2 font-bold flex justify-center items-center text-xl w-16 h-11 mx-1 attempt"
                :class="attemptClass(athlete.attemptStatus3)"
              >
                <FadeOutIn>
                  <span :key="athlete.name">{{ athlete.attempt3 }}</span>
                </FadeOutIn>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-around h-full font-bold py-2">
            <div class="rounded-md bg-white px-2 flex flex-row w-20 justify-between">
              <div>S</div>
              <FadeOutIn>
                <div :key="athlete.name">{{ athlete.bestSquat }}</div>
              </FadeOutIn>
            </div>
            <div class="rounded-md bg-white px-2 flex flex-row w-20 justify-between">
              <div>B</div>
              <FadeOutIn>
                <div :key="athlete.name">{{ athlete.bestBench }}</div>
              </FadeOutIn>
            </div>
            <div class="rounded-md bg-white px-2 flex flex-row w-20 justify-between">
              <div>D</div>
              <FadeOutIn>
                <div :key="athlete.name">{{ athlete.bestDeadlift }}</div>
              </FadeOutIn>
            </div>
          </div>
          <div class="flex flex-col justify-around h-full w-28">
            <div class="flex flex-row bg-white rounded-md items-center justify-between w-full">
              <div class="bg-bvdk-blue rounded-md m-0.5 px-2 text-white w-14">Total</div>
              <FadeOutIn>
                <div :key="athlete.name" class="px-2">{{ athlete.total }}</div>
              </FadeOutIn>
            </div>
            <div class="flex flex-row bg-white rounded-md items-center justify-between w-full">
              <div class="bg-bvdk-blue rounded-md m-0.5 px-2 text-white w-14">Prog.</div>
              <FadeOutIn>
                <div :key="athlete.name" class="px-2">{{ athlete.prognosis }}</div>
              </FadeOutIn>
            </div>
            <div class="flex flex-row bg-white rounded-md items-center justify-between w-full">
              <div class="bg-bvdk-blue rounded-md m-0.5 px-2 text-white w-14">Platz</div>
              <FadeOutIn>
                <div :key="athlete.name" class="px-2">{{ athlete.placement }}</div>
              </FadeOutIn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --secondary: #be0007;
  --primary: #00497f;
  --bg-white: #f4f3f2;
}

body {
  background-color: magenta;
  font-family: 'Open Sans';
  text-transform: uppercase;
  margin: 0px;
}

#container {
  width: 1300px;
  height: 120px;
  padding: 0;
  display: flex;
}

.gradient {
  background: rgb(0, 73, 127);
  background: linear-gradient(
    202deg,
    rgba(0, 73, 127, 1) 0%,
    rgba(9, 9, 121, 1) 51%,
    rgba(190, 0, 7, 1) 100%
  );
}

.ellipses {
  @apply whitespace-nowrap text-ellipsis overflow-hidden;
}

.attempt {
  transition: background-color 0.5s ease;
}

.attempt-success {
  @apply bg-green-600 text-white;
}

.attempt-fail {
  @apply bg-red-600 text-white;
}
</style>
