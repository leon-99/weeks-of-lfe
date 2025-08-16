<template>
  <div id="app">
    <div class="max-w-7xl mx-auto p-8 min-h-screen text-center">
      <header class="text-center mb-12 w-full flex flex-col items-center justify-center relative">
        <h1 class="text-6xl font-bold bg-gradient-to-br from-white to-blue-200 bg-clip-text text-transparent mb-4 text-center block w-full text-white mx-auto">
          Life in Weeks
        </h1>
        <p class="text-xl text-white/80 font-light">Visualize your life journey in a beautiful timeline</p>
      </header>

      <main class="flex flex-col items-center gap-8 w-full text-center">
        <div v-if="!showVisualization" class="w-full max-w-6xl animate-fade-in-up">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start min-h-[600px]">
            <div class="w-full flex flex-col">
              <BirthdayInput @birthday-selected="handleBirthdaySelected" />
            </div>
            <div class="w-full flex flex-col">
              <WorldPopulation />
            </div>
          </div>
        </div>

        <div v-if="showVisualization" class="w-full flex flex-col gap-8 animate-fade-in-up">
          <div class="h-[80vh] w-full relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 mb-8 min-h-[400px]">
            <LifeVisualization 
              :birthday="birthday" 
              :weeks-lived="weeksLived"
              :total-weeks="totalWeeks"
            />
          </div>
          
          <div class="flex justify-center items-center gap-12 p-6 flex-wrap bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
            <div class="flex flex-col items-center text-center">
              <span class="text-sm text-white/70 mb-2 uppercase tracking-wider">Age</span>
              <span class="text-3xl font-semibold text-white">{{ currentAge }} years</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <span class="text-sm text-white/70 mb-2 uppercase tracking-wider">Weeks Lived</span>
              <span class="text-3xl font-semibold text-white">{{ weeksLived }}</span>
            </div>
            <div class="flex flex-col items-center text-center">
              <span class="text-sm text-white/70 mb-2 uppercase tracking-wider">Weeks Remaining</span>
              <span class="text-3xl font-semibold text-white">{{ weeksRemaining }}</span>
            </div>
            <button @click="resetVisualization" class="ml-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white px-6 py-3 text-base font-medium cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg">
              Enter New Birthday
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import BirthdayInput from './components/BirthdayInput.vue'
import LifeVisualization from './components/LifeVisualization.vue'
import WorldPopulation from './components/WorldPopulation.vue'
import { useLifeCalculations } from './composables/useLifeCalculations'

export default {
  name: 'App',
  components: {
    BirthdayInput,
    LifeVisualization,
    WorldPopulation
  },
  setup() {
    const {
      birthday,
      showVisualization,
      currentAge,
      weeksLived,
      weeksRemaining,
      totalWeeks,
      handleBirthdaySelected,
      resetVisualization
    } = useLifeCalculations()

    return {
      birthday,
      showVisualization,
      currentAge,
      weeksLived,
      weeksRemaining,
      totalWeeks,
      handleBirthdaySelected,
      resetVisualization
    }
  }
}
</script>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .max-w-7xl {
    padding: 1rem;
    width: 100%;
  }
  
  .text-6xl {
    font-size: 2.5rem;
  }
  
  .text-xl {
    font-size: 1rem;
  }
  
  .mb-12 {
    margin-bottom: 2rem;
  }
  
  .gap-8 {
    gap: 1.5rem;
  }
  
  .min-h-\[600px\] {
    min-height: auto;
  }
  
  .lg\:grid-cols-2 {
    grid-template-columns: 1fr;
  }
  
  .h-\[80vh\] {
    height: 60vh;
    min-height: 300px;
  }
  
  .rounded-3xl {
    border-radius: 1rem;
  }
  
  .gap-12 {
    gap: 1.5rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .ml-8 {
    margin-left: 0;
    margin-top: 1rem;
    width: 100%;
  }
}

@media (max-width: 480px) {
  .max-w-7xl {
    padding: 0.5rem;
  }
  
  .text-6xl {
    font-size: 2rem;
  }
  
  .text-xl {
    font-size: 0.9rem;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  .h-\[80vh\] {
    height: 50vh;
    min-height: 250px;
  }
  
  .rounded-3xl {
    border-radius: 0.75rem;
  }
  
  .gap-12 {
    gap: 1rem;
  }
  
  .p-6 {
    padding: 0.75rem;
  }
}
</style>
