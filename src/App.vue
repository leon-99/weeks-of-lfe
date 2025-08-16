<template>
  <div id="app">
    <div class="container">
      <header class="header fade-in-up">
        <h1 class="title">Life in Weeks</h1>
        <p class="subtitle">Visualize your life journey in a beautiful 3D timeline</p>
      </header>

      <main class="main-content">
        <div v-if="!showVisualization" class="input-section glass-card fade-in-up">
          <BirthdayInput @birthday-selected="handleBirthdaySelected" />
        </div>

        <div v-if="showVisualization" class="visualization-section fade-in-up">
          <div class="chart-container">
            <LifeVisualization 
              :birthday="birthday" 
              :weeks-lived="weeksLived"
              :total-weeks="totalWeeks"
            />
          </div>
          
          <div class="stats-panel glass">
            <div class="stat-item">
              <span class="stat-label">Age</span>
              <span class="stat-value">{{ currentAge }} years</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Weeks Lived</span>
              <span class="stat-value">{{ weeksLived }}</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Weeks Remaining</span>
              <span class="stat-value">{{ weeksRemaining }}</span>
            </div>
            <button @click="resetVisualization" class="btn-glass reset-btn">
              Enter New Birthday
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import BirthdayInput from './components/BirthdayInput.vue'
import LifeVisualization from './components/LifeVisualization.vue'

export default {
  name: 'App',
  components: {
    BirthdayInput,
    LifeVisualization
  },
  setup() {
    const birthday = ref(null)
    const showVisualization = ref(false)
    const averageLifespan = 75 // years

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

    const handleBirthdaySelected = (selectedBirthday) => {
      birthday.value = selectedBirthday
      showVisualization.value = true
    }

    const resetVisualization = () => {
      birthday.value = null
      showVisualization.value = false
    }

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
.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
}

.title {
  font-size: 3.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffffff 0%, #bfdbfe 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 300;
}

.main-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.input-section {
  max-width: 500px;
  width: 100%;
}

.visualization-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.stats-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.5rem 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.stat-label {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 600;
  color: white;
}

.reset-btn {
  margin-left: 2rem;
}

.chart-container {
  height: 80vh;
  width: 100%;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .stats-panel {
    flex-direction: column;
    gap: 1.5rem;
  }
  
  .reset-btn {
    margin-left: 0;
    margin-top: 1rem;
  }
  
  .chart-container {
    height: 70vh;
  }
}
</style>
