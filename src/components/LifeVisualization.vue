<template>
  <div class="life-visualization">
    <div class="weeks-container">
      <div class="weeks-grid">
        <div 
          v-for="week in totalWeeks" 
          :key="week"
          :class="[
            'week-cube',
            { 
              'lived': week <= weeksLived,
              'current-week': week === weeksLived,
              'milestone': week % 260 === 0 && week > 0
            }
          ]"
        >
        </div>
      </div>
    </div>
    
    <div class="legend">
      <div class="legend-item">
        <div class="legend-cube lived"></div>
        <span>Weeks Lived</span>
      </div>
      <div class="legend-item">
        <div class="legend-cube current"></div>
        <span>Current Week</span>
      </div>
      <div class="legend-item">
        <div class="legend-cube milestone"></div>
        <span>5-Year Milestones</span>
      </div>
      <div class="legend-item">
        <div class="legend-cube future"></div>
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
.life-visualization {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.weeks-container {
  overflow: auto;
  max-height: 80vh;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Basic scrollbar styling */
.weeks-container::-webkit-scrollbar {
  width: 8px;
}

.weeks-container::-webkit-scrollbar-track {
  background: rgba(12, 74, 110, 0.2);
  border-radius: 4px;
}

.weeks-container::-webkit-scrollbar-thumb {
  background: rgba(59, 130, 246, 0.6);
  border-radius: 4px;
}

.weeks-container::-webkit-scrollbar-thumb:hover {
  background: rgba(59, 130, 246, 0.8);
}

.weeks-grid {
  display: grid;
  grid-template-columns: repeat(52, 12px);
  gap: 2px;
  padding: 0;
}

.week-cube {
  width: 12px;
  height: 12px;
  border-radius: 2px;
}

.week-cube.lived {
  background: #3b82f6;
}

.week-cube.current-week {
  background: #10b981;
}

.week-cube.milestone {
  background: #f59e0b;
}

.week-cube:not(.lived) {
  background: rgba(30, 58, 138, 0.3);
}

.legend {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 1.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
}

.legend-cube {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  flex-shrink: 0;
}

.legend-cube.lived {
  background: #3b82f6;
}

.legend-cube.current {
  background: #10b981;
}

.legend-cube.milestone {
  background: #f59e0b;
}

.legend-cube.future {
  background: rgba(30, 58, 138, 0.3);
}

@media (max-width: 768px) {
  .weeks-grid {
    grid-template-columns: repeat(52, 6px);
    gap: 1px;
    padding: 0.5rem;
  }
  
  .week-cube {
    width: 6px;
    height: 6px;
  }
  
  .legend {
    gap: 1rem;
    padding: 1rem;
  }
  
  .legend-item {
    font-size: 0.8rem;
    gap: 0.5rem;
  }
  
  .legend-cube {
    width: 12px;
    height: 12px;
  }
}

@media (max-width: 480px) {
  .weeks-grid {
    grid-template-columns: repeat(52, 4px);
    gap: 1px;
    padding: 0.25rem;
  }
  
  .week-cube {
    width: 4px;
    height: 4px;
  }
  
  .legend {
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;
    padding: 0.5rem;
  }
  
  .legend-item {
    font-size: 0.7rem;
  }
  
  .legend-cube {
    width: 8px;
    height: 8px;
  }
}
</style>
