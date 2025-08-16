<template>
  <div class="text-center p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl">
    <h2 class="text-4xl font-semibold mb-4 text-white">Enter Your Birthday</h2>
    <p class="text-lg text-white/80 mb-10 leading-relaxed">
      Discover how many weeks you've lived and visualize your life journey
    </p>
    
    <form @submit.prevent="handleSubmit" class="mb-12">
      <div class="mb-8">
        <label for="birthday" class="block text-base font-medium text-white/90 mb-3 text-left">
          Date of Birth (DD/MM/YYYY)
        </label>
        <input
          id="birthday"
          :value="birthdayInput"
          type="text"
          class="w-full text-lg px-5 py-4 text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white outline-none transition-all duration-300 focus:border-white/40 focus:bg-white/15 focus:shadow-lg focus:shadow-white/10 placeholder-white/60"
          placeholder="DD/MM/YYYY"
          maxlength="10"
          required
          @input="formatDateInput"
        />
        <div v-if="error" class="text-red-300 text-sm mt-3 p-2 bg-red-500/10 rounded-lg border border-red-500/20">
          {{ error }}
        </div>
      </div>
      
      <button 
        type="submit" 
        class="flex items-center justify-center gap-3 text-lg px-8 py-4 mx-auto min-w-[200px] bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white font-medium transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:bg-white/10 disabled:hover:shadow-none"
        :disabled="!birthdayInput"
      >
        <span class="font-medium">Visualize My Life</span>
        <span class="text-2xl">✨</span>
      </button>
    </form>
    
    <div class="flex flex-col gap-6 mt-8">
      <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
        <div class="text-2xl min-w-8 text-center">📅</div>
        <div class="text-left text-white/90 leading-relaxed">
          <strong class="text-white font-semibold">Life Expectancy:</strong> 75 years (3,900 weeks)
        </div>
      </div>
      <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
        <div class="text-2xl min-w-8 text-center">⏰</div>
        <div class="text-left text-white/90 leading-relaxed">
          <strong class="text-white font-semibold">Each Square:</strong> Represents one week of your life
        </div>
      </div>
      <div class="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5">
        <div class="text-2xl min-w-8 text-center">🎯</div>
        <div class="text-left text-white/90 leading-relaxed">
          <strong class="text-white font-semibold">Perspective:</strong> See your time in a new light
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useLifeCalculations } from '../composables/useLifeCalculations'

export default {
  name: 'BirthdayInput',
  emits: ['birthday-selected'],
  setup(props, { emit }) {
    const birthdayInput = ref('')
    const error = ref('')
    const { formatDateInput: formatInput, processBirthdayInput } = useLifeCalculations()

    const handleDateInput = (event) => {
      const inputValue = event.target.value
      
      // Check if this is a deletion operation
      const isDeleting = inputValue.length < birthdayInput.value.length
      
      if (isDeleting) {
        // Allow deletion without formatting
        birthdayInput.value = inputValue
      } else {
        // Apply formatting for additions
        const formattedValue = formatInput(inputValue)
        birthdayInput.value = formattedValue
      }
      
      error.value = '' // Clear error when user types
    }

    const handleSubmit = () => {
      error.value = ''
      
      if (!birthdayInput.value) {
        error.value = 'Please enter your birthday'
        return
      }
      
      const result = processBirthdayInput(birthdayInput.value)
      if (!result.success) {
        error.value = result.error
        return
      }
      
      emit('birthday-selected', result.isoDate)
    }

    return {
      birthdayInput,
      error,
      formatDateInput: handleDateInput,
      handleSubmit
    }
  }
}
</script>

<style scoped>
/* Mobile responsive adjustments */
@media (max-width: 768px) {
  .text-4xl {
    font-size: 1.8rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .mb-10 {
    margin-bottom: 2rem;
  }
  
  .mb-12 {
    margin-bottom: 2rem;
  }
  
  .mb-8 {
    margin-bottom: 1.5rem;
  }
  
  .p-8 {
    padding: 1.5rem;
  }
  
  .gap-6 {
    gap: 1rem;
  }
  
  .mt-8 {
    margin-top: 1.5rem;
  }
  
  .min-w-\[200px\] {
    min-width: auto;
    width: 100%;
  }
  
  .px-8 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
  
  .py-4 {
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
  }
  
  .gap-4 {
    gap: 0.75rem;
  }
  
  .p-4 {
    padding: 0.75rem;
  }
  
  .text-2xl {
    font-size: 1.5rem;
  }
  
  .min-w-8 {
    min-width: 2rem;
  }
}

@media (max-width: 480px) {
  .text-4xl {
    font-size: 1.6rem;
  }
  
  .text-lg {
    font-size: 0.9rem;
  }
  
  .mb-10 {
    margin-bottom: 1.5rem;
  }
  
  .mb-12 {
    margin-bottom: 1.5rem;
  }
  
  .mb-8 {
    margin-bottom: 1rem;
  }
  
  .p-8 {
    padding: 1rem;
  }
  
  .gap-6 {
    gap: 0.75rem;
  }
  
  .mt-8 {
    margin-top: 1rem;
  }
  
  .px-5 {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  .py-4 {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }
  
  .text-lg {
    font-size: 1rem;
  }
  
  .gap-4 {
    gap: 0.5rem;
  }
  
  .p-4 {
    padding: 0.5rem;
  }
  
  .text-2xl {
    font-size: 1.3rem;
  }
  
  .min-w-8 {
    min-width: 1.5rem;
  }
}
</style>
