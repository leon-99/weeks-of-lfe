<template>
  <div class="w-full h-full flex flex-col gap-8">
    <div class="overflow-auto max-h-[80vh] p-4 bg-white/5 rounded-3xl border border-white/10">
      <!-- Mobile-optimized grid -->
      <div class="md:hidden">
        <div class="grid grid-cols-26 gap-0.5 p-4">
          <div 
            v-for="week in totalWeeks" 
            :key="week"
            :class="[
              'w-3 h-3 rounded-sm transition-all duration-300',
              { 
                'bg-blue-500': week <= weeksLived && week !== weeksLived,
                'bg-green-500': week === weeksLived,
                'bg-yellow-500': week % 260 === 0 && week > 0 && week <= weeksLived,
                'bg-slate-700/30': week > weeksLived
              }
            ]"
          >
          </div>
        </div>
      </div>
      
      <!-- Desktop grid -->
      <div class="hidden md:block">
        <div class="grid grid-cols-[repeat(52,12px)] gap-0.5 p-0">
          <div 
            v-for="week in totalWeeks" 
            :key="week"
            :class="[
              'w-3 h-3 rounded-sm transition-all duration-300',
              { 
                'bg-blue-500': week <= weeksLived && week !== weeksLived,
                'bg-green-500': week === weeksLived,
                'bg-yellow-500': week % 260 === 0 && week > 0 && week <= weeksLived,
                'bg-slate-700/30': week > weeksLived
              }
            ]"
          >
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-center gap-8 p-6 flex-wrap mt-4 bg-white/5 rounded-2xl border border-white/10">
      <div class="flex items-center gap-3 text-white/90 text-sm font-medium">
        <div class="w-4 h-4 rounded-sm bg-blue-500 flex-shrink-0"></div>
        <span>Weeks Lived</span>
      </div>
      <div class="flex items-center gap-3 text-white/90 text-sm font-medium">
        <div class="w-4 h-4 rounded-sm bg-green-500 flex-shrink-0"></div>
        <span>Current Week</span>
      </div>
      <div class="flex items-center gap-3 text-white/90 text-sm font-medium">
        <div class="w-4 h-4 rounded-sm bg-yellow-500 flex-shrink-0"></div>
        <span>5-Year Milestones</span>
      </div>
      <div class="flex items-center gap-3 text-white/90 text-sm font-medium">
        <div class="w-4 h-4 rounded-sm bg-slate-700/30 flex-shrink-0"></div>
        <span>Future Weeks</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LifeVisualization',
  props: {
    birthday: String,
    weeksLived: Number,
    totalWeeks: Number
  }
}
</script>

<style scoped>
/* Custom scrollbar styling */
.overflow-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-auto::-webkit-scrollbar-track {
  background: rgba(12, 74, 110, 0.2);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.6);
  border-radius: 4px;
}

.overflow-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}

/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .max-h-\[80vh\] {
    max-height: 60vh;
  }
  
  .p-4 {
    padding: 0.75rem;
  }
  
  .rounded-3xl {
    border-radius: 1rem;
  }
  
  .gap-8 {
    gap: 1rem;
  }
  
  .p-6 {
    padding: 1rem;
  }
  
  .mt-4 {
    margin-top: 0.75rem;
  }
  
  .gap-3 {
    gap: 0.5rem;
  }
  
  .text-sm {
    font-size: 0.8rem;
  }
  
  /* Mobile grid specific adjustments */
  .grid-cols-26 {
    grid-template-columns: repeat(26, minmax(0, 1fr));
  }
  
  .gap-0\.5 {
    gap: 2px;
  }
  
  .w-3 {
    width: 0.75rem;
    height: 0.75rem;
  }
}

@media (max-width: 480px) {
  .max-h-\[80vh\] {
    max-height: 50vh;
  }
  
  .p-4 {
    padding: 0.5rem;
  }
  
  .rounded-3xl {
    border-radius: 0.75rem;
  }
  
  .gap-8 {
    gap: 0.75rem;
  }
  
  .p-6 {
    padding: 0.5rem;
  }
  
  .mt-4 {
    margin-top: 0.5rem;
  }
  
  .gap-3 {
    gap: 0.4rem;
  }
  
  .text-sm {
    font-size: 0.7rem;
  }
  
  /* Extra small screen grid adjustments */
  .grid-cols-26 {
    grid-template-columns: repeat(26, minmax(0, 1fr));
  }
  
  .gap-0\.5 {
    gap: 1px;
  }
  
  .w-3 {
    width: 0.6rem;
    height: 0.6rem;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .max-h-\[80vh\] {
    max-height: 70vh;
  }
  
  .p-4 {
    padding: 1rem;
  }
}
</style>
