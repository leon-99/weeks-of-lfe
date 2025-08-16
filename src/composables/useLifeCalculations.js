import { ref, computed } from 'vue'

export function useLifeCalculations() {
  const birthday = ref(null)
  const showVisualization = ref(false)
  const averageLifespan = 75 // years

  // Date parsing and validation functions
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

  const formatDateInput = (inputValue) => {
    // Remove all non-digits first
    let value = inputValue.replace(/\D/g, '')
    
    // Only format if we have digits and the input is not empty
    if (value.length > 0) {
      if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2)
      }
      if (value.length >= 5) {
        value = value.substring(0, 5) + '/' + value.substring(5, 9)
      }
    }
    
    return value
  }

  // Life calculation computed properties
  const currentAge = computed(() => {
    if (!birthday.value) return 0
    const today = new Date()
    const birthDate = new Date(birthday.value)
    const ageInMilliseconds = today - birthDate
    const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25)
    return Math.floor(ageInYears)
  })

  const weeksLived = computed(() => {
    if (!birthday.value) return 0
    const today = new Date()
    const birthDate = new Date(birthday.value)
    const timeDiff = today - birthDate
    const weeksLived = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7))
    return weeksLived
  })

  const totalWeeks = computed(() => {
    return averageLifespan * 52 // 52 weeks per year
  })

  const weeksRemaining = computed(() => {
    return Math.max(0, totalWeeks.value - weeksLived.value)
  })

  // Event handlers
  const handleBirthdaySelected = (selectedBirthday) => {
    birthday.value = selectedBirthday
    showVisualization.value = true
  }

  const resetVisualization = () => {
    birthday.value = null
    showVisualization.value = false
  }

  const processBirthdayInput = (dateStr) => {
    const validationError = validateBirthday(dateStr)
    if (validationError) {
      return { success: false, error: validationError }
    }
    
    // Convert to ISO format for the parent component
    const birthDate = parseDateString(dateStr)
    const isoString = birthDate.toISOString().split('T')[0]
    
    return { success: true, isoDate: isoString }
  }

  return {
    // State
    birthday,
    showVisualization,
    
    // Constants
    averageLifespan,
    
    // Computed values
    currentAge,
    weeksLived,
    weeksRemaining,
    totalWeeks,
    
    // Methods
    parseDateString,
    validateBirthday,
    formatDateInput,
    processBirthdayInput,
    handleBirthdaySelected,
    resetVisualization
  }
}
