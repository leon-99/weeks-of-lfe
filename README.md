# Life in Weeks

A beautiful 3D visualization of your life journey, showing each week as an interactive cube in a stunning sea blue glass-themed interface.

## Features

- 🎂 **Birthday Input**: Enter your birthday with validation
- 📊 **3D Visualization**: Interactive Three.js visualization of your life weeks
- ✨ **Glass Theme**: Modern sea blue theme with glass morphism effects
- 🎮 **Interactive**: Mouse controls, animations, and camera reset
- 📱 **Responsive**: Works perfectly on desktop and mobile devices
- ⚡ **Fast**: Built with Vite for lightning-fast development and builds

## Tech Stack

- **Vue 3** with Composition API
- **Three.js** for 3D graphics and animations
- **Vite** for build tooling
- **CSS3** with glass morphism effects
- **No TypeScript** (as requested)

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How It Works

1. **Enter Your Birthday**: Input your date of birth using the date picker
2. **View Your Life**: See your life visualized as a 3D grid of cubes
3. **Interact**: 
   - Move your mouse to control the camera
   - Use "Reset View" to return to the default camera position
   - Toggle animations on/off
   - Each bright blue cube represents a week you've lived
   - Darker cubes represent future weeks

## Visualization Details

- **Life Expectancy**: 75 years (3,900 weeks)
- **Grid Layout**: 52 weeks per row (one year)
- **Lived Weeks**: Bright blue with glow effect and animations
- **Future Weeks**: Darker blue, semi-transparent
- **Year Labels**: Every 5 years for reference
- **Floating Particles**: Ambient background effects

## Customization

You can easily customize:

- **Life expectancy**: Change `averageLifespan` in `App.vue`
- **Colors**: Modify the sea blue theme in `style.css` and component styles
- **Animation speed**: Adjust timing values in `LifeVisualization.vue`
- **Grid layout**: Modify `weeksPerRow` for different layouts

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

Requires WebGL support for 3D visualization.

## Performance

- Optimized for smooth 60fps animations
- Efficient Three.js rendering
- Responsive design with mobile optimizations
- Particle system with performance considerations

## License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Life in Weeks** - Visualize your time and make every week count! ✨
