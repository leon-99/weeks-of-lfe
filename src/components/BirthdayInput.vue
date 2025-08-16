<template>
  <div class="birthday-input">
    <h2 class="input-title">Enter Your Birthday</h2>
    <p class="input-description">
      Discover how many weeks you've lived and visualize your life journey
    </p>
    
    <form @submit.prevent="handleSubmit" class="input-form">
      <div class="input-group">
        <label for="birthday" class="input-label">Date of Birth (DD/MM/YYYY)</label>
        <input
          id="birthday"
          v-model="birthdayInput"
          type="text"
          class="input-glass birthday-field"
          placeholder="DD/MM/YYYY"
          maxlength="10"
          required
          @input="formatDateInput"
        />
        <div v-if="error" class="error-message">
          {{ error }}
        </div>
      </div>
      
      <button 
        type="submit" 
        class="btn-glass submit-btn pulse-hover"
        :disabled="!birthdayInput"
      >
        <span class="btn-text">Visualize My Life</span>
        <span class="btn-icon">✨</span>
      </button>
    </form>
    
    <div class="info-section">
      <div class="info-item">
        <div class="info-icon">📅</div>
        <div class="info-text">
          <strong>Life Expectancy:</strong> 75 years (3,900 weeks)
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">⏰</div>
        <div class="info-text">
          <strong>Each Square:</strong> Represents one week of your life
        </div>
      </div>
      <div class="info-item">
        <div class="info-icon">🎯</div>
        <div class="info-text">
          <strong>Perspective:</strong> See your time in a new light
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'BirthdayInput',
  emits: ['birthday-selected'],
  setup(props, { emit }) {
    const birthdayInput = ref('')
    const error = ref('')

    const formatDateInput = (event) => {
      let value = event.target.value.replace(/\D/g, '') // Remove non-digits
      
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2)
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9)
      }
      
      birthdayInput.value = value
      error.value = '' // Clear error when user types
    }

    const parseDateString = (dateStr) => {
      // Parse DD/MM/YYYY format
      const parts = dateStr.split('/')
      if (parts.length !== 3) return null
      
      const day = parseInt(parts[0])
      const month = parseInt(parts[1])
      const year = parseInt(parts[2])
      
      // Basic validation
      if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
        return null
      }
      
      // Create date object (month is 0-indexed in JavaScript)
      const date = new Date(year, month - 1, day)
      
      // Check if the date is valid (handles leap years, etc.)
      if (date.getDate() !== day || date.getMonth() !== month - 1 || date.getFullYear() !== year) {
        return null
      }
      
      return date
    }

    const validateBirthday = (dateStr) => {
      if (!dateStr || dateStr.length !== 10) {
        return 'Please enter a complete date (DD/MM/YYYY)'
      }
      
      const birthDate = parseDateString(dateStr)
      if (!birthDate) {
        return 'Please enter a valid date (DD/MM/YYYY)'
      }
      
      const today = new Date()
      
      if (birthDate > today) {
        return 'Birthday cannot be in the future'
      }
      
      const age = (today - birthDate) / (1000 * 60 * 60 * 24 * 365.25)
      if (age > 120) {
        return 'Please enter a realistic birthday'
      }
      
      if (age < 0) {
        return 'Please enter a valid birthday'
      }
      
      return null
    }

    const handleSubmit = () => {
      error.value = ''
      
      if (!birthdayInput.value) {
        error.value = 'Please enter your birthday'
        return
      }
      
      const validationError = validateBirthday(birthdayInput.value)
      if (validationError) {
        error.value = validationError
        return
      }
      
      // Convert to ISO format for the parent component
      const birthDate = parseDateString(birthdayInput.value)
      const isoString = birthDate.toISOString().split('T')[0]
      
      emit('birthday-selected', isoString)
    }

    return {
      birthdayInput,
      error,
      formatDateInput,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.birthday-input {
  text-align: center;
}

.input-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.input-description {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.input-form {
  margin-bottom: 3rem;
}

.input-group {
  margin-bottom: 2rem;
}

.input-label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 0.8rem;
  text-align: left;
}

.birthday-field {
  font-size: 1.1rem;
  padding: 16px 20px;
  text-align: center;
}



.error-message {
  color: #fca5a5;
  font-size: 0.9rem;
  margin-top: 0.8rem;
  padding: 0.5rem;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  border: 1px solid rgba(239, 68, 68, 0.2);
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 1.1rem;
  padding: 16px 32px;
  margin: 0 auto;
  min-width: 200px;
  transition: all 0.3s ease;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
}

.submit-btn:disabled:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: none;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.btn-text {
  font-weight: 500;
}

.btn-icon {
  font-size: 1.2rem;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.info-item:hover {
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-2px);
}

.info-icon {
  font-size: 1.5rem;
  min-width: 2rem;
  text-align: center;
}

.info-text {
  text-align: left;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.5;
}

.info-text strong {
  color: white;
  font-weight: 600;
}

@media (max-width: 768px) {
  .input-title {
    font-size: 1.8rem;
  }
  
  .input-description {
    font-size: 1rem;
  }
  
  .submit-btn {
    width: 100%;
    min-width: auto;
  }
  
  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }
  
  .info-text {
    text-align: center;
  }
}
</style>
