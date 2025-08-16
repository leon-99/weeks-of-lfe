import { ref, computed, onMounted } from 'vue'

export function useWorldPopulation() {
  const populationData = ref([])
  const lastUpdated = ref('')
  const isLoading = ref(true)
  const error = ref('')
  
  const fetchPopulationData = async () => {
    try {
      isLoading.value = true
      error.value = ''
      
      const response = await fetch('http://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data && data[1] && Array.isArray(data[1])) {
        // Extract the last 10 years of data for better trend visualization
        const recentData = data[1].slice(0, 10).map(item => ({
          date: item.date,
          value: item.value
        }))
        
        populationData.value = recentData
        lastUpdated.value = data[0]?.lastupdated || new Date().toISOString().split('T')[0]
      } else {
        throw new Error('Invalid data format received from API')
      }
    } catch (err) {
      console.error('Error fetching population data:', err)
      error.value = 'Failed to load population data. Using fallback data.'
      
      // Fallback to hardcoded data if API fails
      const fallbackData = [
        { date: '2024', value: 8142056446 },
        { date: '2023', value: 8064976601 },
        { date: '2022', value: 7990399768 },
        { date: '2021', value: 7920861888 },
        { date: '2020', value: 7855075060 },
        { date: '2019', value: 7778303912 },
        { date: '2018', value: 7697492379 },
        { date: '2017', value: 7614748582 },
        { date: '2016', value: 7529066617 },
        { date: '2015', value: 7441826877 }
      ]
      populationData.value = fallbackData
      lastUpdated.value = '2025-01-01'
    } finally {
      isLoading.value = false
    }
  }
  
  onMounted(() => {
    fetchPopulationData()
  })
  
  const currentPopulation = computed(() => {
    return populationData.value[0]?.value || 8142056446
  })
  
  const populationGrowth = computed(() => {
    if (populationData.value.length < 2) return 0
    return populationData.value[0].value - populationData.value[1].value
  })
  
  const dailyGrowth = computed(() => {
    return Math.round(populationGrowth.value / 365)
  })
  
  const populationDensity = computed(() => {
    // Earth's land area is approximately 148.9 million km²
    const earthLandArea = 148900000
    return Math.round(currentPopulation.value / earthLandArea)
  })
  
  const recentYears = computed(() => {
    return populationData.value.slice(0, 10).reverse()
  })
  
  const maxPopulation = computed(() => {
    return Math.max(...populationData.value.map(d => d.value))
  })
  
  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }
  
  const formatFullNumber = (num) => {
    return num.toLocaleString()
  }
  
  const getBarHeight = (value) => {
    const maxHeight = 120
    return `${(value / maxPopulation.value) * maxHeight}px`
  }
  
  return {
    // State
    populationData,
    lastUpdated,
    isLoading,
    error,
    
    // Computed values
    currentPopulation,
    populationGrowth,
    dailyGrowth,
    populationDensity,
    recentYears,
    maxPopulation,
    
    // Methods
    fetchPopulationData,
    formatNumber,
    formatFullNumber,
    getBarHeight
  }
}
