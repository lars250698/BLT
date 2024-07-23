<script setup lang="ts">
import ScoreboardOverall from './components/ScoreboardOverall.vue'
import { useStore } from 'vuex'
import ScoreboardSquat from './components/ScoreboardSquat.vue'
import ScoreboardBench from './components/ScoreboardBench.vue'
import ScoreboardDeadlift from './components/ScoreboardDeadlift.vue'
import TransparentWindowControls from '../../components/TransparentWindowControls.vue'
import { ScoreboardType } from '../../../../shared/src/models/stream-settings-models'

const store = useStore()
</script>
<template>
  <div class="w-full h-full overflow-hidden bg-opacity-0">
    <TransparentWindowControls></TransparentWindowControls>
    <div class="flex mx-auto" style="width: 1000px; height: 600px">
      <div class="flex flex-col justify-start w-full h-full">
        <div class="flex w-full gradient h-16 my-2">
          <div class="flex flex-row w-full h-full justify-start items-center px-4">
            <div class="text-white text-4xl">Ergebnisse</div>
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
  </div>
</template>

<style scoped></style>
