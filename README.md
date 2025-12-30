# Monte Carlo π Approximation

An interactive visualization of the Monte Carlo method for approximating π through random sampling. Built with p5.js and modern web technologies.

![Monte Carlo Simulation](https://img.shields.io/badge/Method-Monte%20Carlo-blueviolet)
![p5.js](https://img.shields.io/badge/p5.js-1.7.0-ED225D)
![Status](https://img.shields.io/badge/Status-Complete-success)

## What is this?

This project demonstrates how we can approximate the value of π using random sampling and probability. By randomly placing points in a square and counting how many fall inside an inscribed circle, we can estimate π using the simple ratio:

```
π ≈ 4 × (points inside circle / total points)
```

The more points we use, the better our approximation becomes!

## Features

### Real-time Statistics

- Live π approximation as points are generated
- Current error from actual π value
- Percentage of points inside vs outside
- Visual progress bar

### Interactive Controls

- **Adjustable point count**: From 100 to 100,000 points
- **Variable speed**: 5 speed levels (Very Slow to Very Fast)
- **Pause/Resume**: Control the simulation flow
- **Instant restart**: Clear and start over anytime

### Beautiful Design

- Modern gradient backgrounds
- Smooth animations and transitions
- Color-coded points (green inside, red outside)
- Responsive layout for all devices
- Dark theme optimized for extended viewing

### Keyboard Shortcuts

- **Spacebar**: Pause/Resume simulation
- **R**: Restart simulation

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required!

### Running Locally

1. Clone or download this repository
2. Open `montecarlo-index.html` in your web browser
3. Start experimenting with different point counts and speeds!

```bash
# If you have a local server (optional)
python -m http.server 8000
# Then navigate to http://localhost:8000/montecarlo-index.html
```

## How the Algorithm Works

1. **Define a square** with side length 2r (where r is the circle radius)
2. **Inscribe a circle** with radius r inside the square
3. **Generate random points** uniformly distributed in the square
4. **Count points** that fall inside the circle vs total points
5. **Calculate ratio**: `points_inside / total_points`
6. **Approximate π**: Multiply the ratio by 4

### Why does this work?

The ratio of areas is:

- Circle area: πr²
- Square area: (2r)² = 4r²
- Ratio: πr² / 4r² = π/4

So: `points_inside / total_points ≈ π/4`

Therefore: `π ≈ 4 × (points_inside / total_points)`

## Technical Details

### Built With

- **p5.js** - Creative coding library for visualization
- **Vanilla JavaScript** - Clean, no-framework approach
- **CSS3** - Modern styling with gradients and animations
- **HTML5** - Semantic structure

### Project Structure

```
monte-carlo-pi/
├── montecarlo-index.html    # Main HTML structure
├── montecarlo-style.css     # Styling and animations
├── montecarlo-script.js     # Simulation logic
└── README.md               # This file
```

### Code Highlights

**Efficient Batch Processing**

```javascript
const batchSize = speedMultipliers[state.simulationSpeed];
for (let i = 0; i < batchSize && state.currentPoints < state.totalPoints; i++) {
  drawPoint();
}
```

**Accurate Distance Calculation**

```javascript
const distance = sqrt((randomX - width / 2) ** 2 + (randomY - height / 2) ** 2);
const isInside = distance <= state.radius / 2;
```

**Real-time Statistics**

```javascript
const piApproximation = 4 * (state.pointsInside / state.currentPoints);
const error = Math.abs(Math.PI - piApproximation);
```

## Performance

- **Smooth 60 FPS** animation
- **Batch processing** for efficient point generation
- **Responsive design** adapts to any screen size
- **Optimized rendering** with p5.js

## Educational Value

This project is perfect for:

- Understanding the Monte Carlo method
- Learning about probability and statistics
- Visualizing mathematical concepts
- Exploring the relationship between randomness and π
- Teaching computational approximation methods

## Experimentation Ideas

1. **Accuracy vs Speed**: Does slower point generation affect accuracy?
2. **Sample Size**: How many points do you need for 4 decimal places?
3. **Convergence**: Plot error over time - does it decrease monotonically?
4. **Law of Large Numbers**: Observe how approximation stabilizes with more points

## Customization

Want to tweak the design? Here are some ideas:

### Change Colors

Edit `montecarlo-style.css`:

```css
:root {
  --primary-color: #your-color;
  --success-color: #your-color;
  --danger-color: #your-color;
}
```

### Adjust Canvas Size

Edit `montecarlo-script.js`:

```javascript
function setup() {
  const canvas = createCanvas(600, 600); // Change dimensions
  // ...
}
```

### Modify Point Size

In the `draw()` function:

```javascript
ellipse(point.x, point.y, 8, 8); // Increase from 5 to 8
```

## Expected Results

| Points  | Typical Accuracy | Time (Fast Speed) |
| ------- | ---------------- | ----------------- |
| 100     | ~2 decimals      | Instant           |
| 1,000   | ~2-3 decimals    | < 1 second        |
| 10,000  | ~3-4 decimals    | ~2 seconds        |
| 100,000 | ~4-5 decimals    | ~10 seconds       |

_Note: Due to randomness, results vary between runs_

## Known Limitations

- Very high point counts (>100k) may slow down on older devices
- Canvas rendering is limited to browser performance
- Statistical variance means each run produces slightly different results

## Contributing

Contributions are welcome! Some ideas:

- Add 3D visualization option
- Include convergence graph
- Add different geometric shapes
- Implement WebGL for better performance
- Add export functionality for data

## Learn More

- [Monte Carlo Method - Wikipedia](https://en.wikipedia.org/wiki/Monte_Carlo_method)
- [p5.js Documentation](https://p5js.org/reference/)
- [Buffon's Needle Problem](https://en.wikipedia.org/wiki/Buffon%27s_needle_problem) - Another probabilistic approach to π

## License

This project is open source and available for educational purposes. Feel free to use, modify, and distribute!

## Acknowledgments

- Built with [p5.js](https://p5js.org/)
- Inspired by classical Monte Carlo simulations
- Design influenced by modern data visualization principles

---

**Made with ❤️ and random numbers**


**Happy approximating!**
