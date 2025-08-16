<template>
  <div class="p-6 w-full h-full animate-fade-in-up">
    <div class="text-center mb-8">
      <h3 class="text-3xl font-semibold text-white mb-2">🌍 World Population</h3>
      <p class="text-white/70 text-sm mb-4">Live data from World Bank</p>
      <div v-if="isLoading" class="flex items-center justify-center gap-2 mb-4">
        <div class="w-4 h-4 border-2 border-white/30 border-t-blue-400 rounded-full animate-spin"></div>
        <span class="text-white/80 text-sm italic">Loading latest data...</span>
      </div>
      <div v-if="error" class="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-4">
        <span class="text-red-300 text-sm text-center">{{ error }}</span>
      </div>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-6">
      <div class="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div class="text-4xl opacity-80">👥</div>
        <div class="flex flex-col">
          <span class="text-2xl font-semibold text-white mb-1">{{ formatFullNumber(currentPopulation) }}</span>
          <span class="text-sm text-white/60 uppercase tracking-wider">Current (2024)</span>
        </div>
      </div>
      
      <div class="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div class="text-4xl opacity-80">📈</div>
        <div class="flex flex-col">
          <span class="text-2xl font-semibold text-white mb-1">{{ formatFullNumber(populationGrowth) }}</span>
          <span class="text-sm text-white/60 uppercase tracking-wider">Growth (2023-2024)</span>
        </div>
      </div>
      
      <div class="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div class="text-4xl opacity-80">📊</div>
        <div class="flex flex-col">
          <span class="text-2xl font-semibold text-white mb-1">{{ formatFullNumber(dailyGrowth) }}</span>
          <span class="text-sm text-white/60 uppercase tracking-wider">Daily Growth</span>
        </div>
      </div>
      
      <div class="flex items-center gap-4 p-6 bg-white/5 rounded-2xl border border-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
        <div class="text-4xl opacity-80">🌍</div>
        <div class="flex flex-col">
          <span class="text-2xl font-semibold text-white mb-1">{{ formatNumber(populationDensity) }}</span>
          <span class="text-sm text-white/60 uppercase tracking-wider">Per km²</span>
        </div>
      </div>
    </div>
    
    <div class="mb-8">
      <h4 class="text-xl text-white text-center mb-6">Population Trend (Last 10 Years)</h4>
      <!-- Mobile-optimized chart container -->
      <div class="md:hidden">
        <div class="flex justify-between items-end h-32 gap-1 mb-6 relative">
          <div 
            v-for="(year, index) in recentYears" 
            :key="year.date"
            class="flex-1 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg min-w-[24px] relative transition-all duration-300 hover:from-blue-400 hover:to-blue-300 hover:scale-y-105 cursor-pointer"
            :style="{ height: getBarHeight(year.value) }"
            :title="`${year.date}: ${formatFullNumber(year.value)}`"
          >
            <span class="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs text-white/80 whitespace-nowrap font-medium">{{ (year.value / 1000000000).toFixed(1) }}B</span>
          </div>
        </div>
        <div class="flex justify-between gap-0.5">
          <span v-for="year in recentYears" :key="year.date" class="flex-1 text-center text-xs text-white/60 font-medium">
            {{ year.date }}
          </span>
        </div>
      </div>
      
      <!-- Desktop chart (hidden on mobile) -->
      <div class="hidden md:block">
        <div class="flex justify-between items-end h-32 gap-2 mb-4 relative">
          <div 
            v-for="(year, index) in recentYears" 
            :key="year.date"
            class="flex-1 bg-gradient-to-t from-blue-600 to-blue-500 rounded-t-lg min-w-[40px] relative transition-all duration-300 hover:from-blue-400 hover:to-blue-300 hover:scale-y-105 cursor-pointer"
            :style="{ height: getBarHeight(year.value) }"
            :title="`${year.date}: ${formatFullNumber(year.value)}`"
          >
            <span class="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-white/80 whitespace-nowrap font-medium">{{ (year.value / 1000000000).toFixed(1) }}B</span>
          </div>
        </div>
        <div class="flex justify-between gap-4">
          <span v-for="year in recentYears" :key="year.date" class="flex-1 text-center text-sm text-white/60 font-medium">
            {{ year.date }}
          </span>
        </div>
      </div>
    </div>
    
    <div class="text-center pt-4 border-t border-white/10">
      <span class="text-sm text-white/50">Last updated: {{ lastUpdated }}</span>
    </div>
  </div>
</template>

<script>
import { useWorldPopulation } from '../composables/useWorldPopulation'

export default {
  name: 'WorldPopulation',
  setup() {
    const {
      currentPopulation,
      populationGrowth,
      dailyGrowth,
      populationDensity,
      recentYears,
      lastUpdated,
      formatNumber,
      formatFullNumber,
      getBarHeight,
      isLoading,
      error
    } = useWorldPopulation()
    
    return {
      currentPopulation,
      populationGrowth,
      dailyGrowth,
      populationDensity,
      recentYears,
      lastUpdated,
      formatNumber,
      formatFullNumber,
      getBarHeight,
      isLoading,
      error
    }
  }
}
</script>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .p-6 {
    padding: 1rem;
  }
  
  .mb-8 {
    margin-bottom: 1.5rem;
  }
  
  .text-3xl {
    font-size: 1.6rem;
  }
  
  .text-sm {
    font-size: 0.85rem;
  }
  
  .mb-4 {
    margin-bottom: 0.75rem;
  }
  
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gap-4 {
    gap: 0.75rem;
  }
  
  .mb-6 {
    margin-bottom: 1rem;
  }
  
  .text-4xl {
    font-size: 1.5rem;
  }
  
  .text-2xl {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .p-6 {
    padding: 0.75rem;
  }
  
  .text-3xl {
    font-size: 1.4rem;
  }
  
  .text-sm {
    font-size: 0.8rem;
  }
  
  .gap-4 {
    gap: 0.5rem;
  }
  
  .text-4xl {
    font-size: 1.2rem;
  }
  
  .text-2xl {
    font-size: 1rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .gap-4 {
    gap: 0.75rem;
  }
}
</style>
