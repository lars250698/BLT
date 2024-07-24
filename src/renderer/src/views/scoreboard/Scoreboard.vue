<script setup lang="ts">
import ScoreboardOverall from './components/ScoreboardOverall.vue'
import { useStore } from 'vuex'
import TransparentWindowControls from '../../components/TransparentWindowControls.vue'
import FadeOutIn from '../../components/transitions/FadeOutIn.vue'
import { ScoreboardType } from '../../../../shared/src/models/stream-settings-models'
import ScoreboardSquat from './components/ScoreboardSquat.vue'
import ScoreboardBench from './components/ScoreboardBench.vue'
import ScoreboardDeadlift from './components/ScoreboardDeadlift.vue'
import { onMounted, ref } from 'vue'

const store = useStore()
const groupName = ref('')

onMounted(() => {
  window.streamData
    .getSelectedScoreboardGroupName(store.state.sharedState.selectedScoreboardType)
    .then((res) => (groupName.value = res))
})
</script>
<template>
  <div class="w-full h-full overflow-hidden bg-opacity-0">
    <TransparentWindowControls></TransparentWindowControls>
    <FadeOutIn>
      <div
        :key="store.state.sharedState.selectedScoreboardType"
        class="flex mx-auto"
        style="width: 1000px; height: 600px"
      >
        <div class="flex flex-col justify-start w-full h-full">
          <div class="flex w-full gradient h-20 my-2">
            <div class="flex flex-row w-full h-full justify-start items-center px-4 text-white">
              <div class="flex flex-col h-full justify-around py-2 text-white">
                <div class="text-4xl">Ergebnisse</div>
                <div class="text-sm font-light">{{ groupName }}</div>
              </div>
            </div>
          </div>
          <ScoreboardOverall
            v-if="store.state.sharedState.selectedScoreboardType === ScoreboardType.Overall"
          />
          <ScoreboardSquat
            v-if="store.state.sharedState.selectedScoreboardType === ScoreboardType.Squat"
          />
          <ScoreboardBench
            v-if="store.state.sharedState.selectedScoreboardType === ScoreboardType.Bench"
          />
          <ScoreboardDeadlift
            v-if="store.state.sharedState.selectedScoreboardType === ScoreboardType.Deadlift"
          />
        </div>
      </div>
    </FadeOutIn>
  </div>
</template>

<style scoped></style>
