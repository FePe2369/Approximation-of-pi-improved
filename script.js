// Game State
const state = {
  totalPoints: 10000,
  currentPoints: 0,
  pointsInside: 0,
  allPoints: [],
  isPaused: false,
  simulationSpeed: 3,
  radius: 500, // Changed from 400 to 500 - must match canvas size!
  isComplete: false,
};

// Speed multipliers
const speedMultipliers = {
  1: 1, // Slow
  2: 5, // Slower
  3: 10, // Medium
  4: 50, // Faster
  5: 200, // Fast
};

const speedLabels = {
  1: "Very Slow",
  2: "Slow",
  3: "Medium",
  4: "Fast",
  5: "Very Fast",
};

// p5.js Setup
function setup() {
  const canvas = createCanvas(500, 500);
  canvas.parent("canvas-container");
  frameRate(60);
  initializeUI();
}

// Draw a single random point
function drawPoint() {
  const randomX = random(width);
  const randomY = random(height);
  const distance = sqrt(
    (randomX - width / 2) ** 2 + (randomY - height / 2) ** 2
  );
  const isInside = distance <= state.radius / 2;

  state.allPoints.push({ x: randomX, y: randomY, inside: isInside });

  if (isInside) {
    state.pointsInside++;
  }

  state.currentPoints++;
}

// Main draw loop
function draw() {
  // Background - Matrix black
  background(0, 0, 0);

  // Draw square
  noFill();
  stroke(0, 255, 65, 50);
  strokeWeight(2);
  rect(0, 0, width, height);

  // Draw circle
  stroke(0, 255, 65, 80);
  strokeWeight(2);
  ellipse(width / 2, height / 2, state.radius);

  // Draw all points
  noStroke();
  state.allPoints.forEach((point) => {
    fill(point.inside ? "rgba(0, 255, 65, 0.8)" : "rgba(255, 0, 85, 0.8)");
    ellipse(point.x, point.y, 5, 5);
  });

  // Generate new points (if not paused and not complete)
  if (!state.isPaused && !state.isComplete) {
    const batchSize = speedMultipliers[state.simulationSpeed];

    for (
      let i = 0;
      i < batchSize && state.currentPoints < state.totalPoints;
      i++
    ) {
      drawPoint();
    }

    // Update UI
    updateStats();

    // Check if complete
    if (state.currentPoints >= state.totalPoints) {
      state.isComplete = true;
      showCompletionMessage();
    }
  }
}

// Update statistics in real-time
function updateStats() {
  const piApproximation =
    state.currentPoints > 0
      ? 4 * (state.pointsInside / state.currentPoints)
      : 0;
  const error = Math.abs(Math.PI - piApproximation);
  const percentInside =
    state.currentPoints > 0
      ? ((state.pointsInside / state.currentPoints) * 100).toFixed(2)
      : 0;
  const progress = (state.currentPoints / state.totalPoints) * 100;

  // Update DOM elements
  document.getElementById("pi-value").textContent = piApproximation.toFixed(6);
  document.getElementById("points-generated").textContent =
    state.currentPoints.toLocaleString();
  document.getElementById(
    "points-inside"
  ).textContent = `${state.pointsInside.toLocaleString()} (${percentInside}%)`;
  document.getElementById("error-value").textContent = error.toFixed(6);
  document.getElementById("progress-fill").style.width = `${progress}%`;
}

// Show completion message on canvas
function showCompletionMessage() {
  const piApproximation = 4 * (state.pointsInside / state.totalPoints);
  const error = Math.abs(Math.PI - piApproximation);

  fill(0, 255, 65, 20);
  stroke(0, 255, 65);
  strokeWeight(2);
  rect(50, height / 2 - 60, width - 100, 120, 0);

  fill(0, 255, 65);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  text(">>> SIMULATION COMPLETE <<<", width / 2, height / 2 - 30);

  textSize(14);
  textStyle(NORMAL);
  text(`π ≈ ${piApproximation.toFixed(6)}`, width / 2, height / 2);
  text(`Error: ${error.toFixed(6)}`, width / 2, height / 2 + 25);
}

// Reset simulation
function resetSimulation() {
  state.currentPoints = 0;
  state.pointsInside = 0;
  state.allPoints = [];
  state.isPaused = false;
  state.isComplete = false;

  updateStats();
  updatePauseButton();
  loop();
}

// Toggle pause
function togglePause() {
  state.isPaused = !state.isPaused;
  updatePauseButton();
}

// Update pause button UI
function updatePauseButton() {
  const pauseBtn = document.getElementById("pause-btn");
  const pauseIcon = document.getElementById("pause-icon");
  const pauseText = document.getElementById("pause-text");

  if (state.isPaused) {
    pauseIcon.textContent = "▶";
    pauseText.textContent = "Resume";
  } else {
    pauseIcon.textContent = "⏸";
    pauseText.textContent = "Pause";
  }
}

// Initialize UI and event listeners
function initializeUI() {
  const pointsSlider = document.getElementById("points-slider");
  const pointsDisplay = document.getElementById("points-display");
  const speedSlider = document.getElementById("speed-slider");
  const speedDisplay = document.getElementById("speed-display");
  const pauseBtn = document.getElementById("pause-btn");
  const restartBtn = document.getElementById("restart-btn");

  // Points slider
  pointsSlider.addEventListener("input", (e) => {
    state.totalPoints = parseInt(e.target.value);
    pointsDisplay.textContent = state.totalPoints.toLocaleString();
  });

  // Speed slider
  speedSlider.addEventListener("input", (e) => {
    state.simulationSpeed = parseInt(e.target.value);
    speedDisplay.textContent = speedLabels[state.simulationSpeed];
  });

  // Pause button
  pauseBtn.addEventListener("click", togglePause);

  // Restart button
  restartBtn.addEventListener("click", resetSimulation);

  // Initialize displays
  pointsDisplay.textContent = state.totalPoints.toLocaleString();
  speedDisplay.textContent = speedLabels[state.simulationSpeed];
  updateStats();
}

// Keyboard shortcuts
function keyPressed() {
  if (key === " ") {
    togglePause();
  } else if (key === "r" || key === "R") {
    resetSimulation();
  }
}
