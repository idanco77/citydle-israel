import confetti from "canvas-confetti";

export const startConfetti = () => {
  const duration = 2000; // in milliseconds

  confetti({
    particleCount: 200,
    spread: 180,
    angle: 270,
    origin: {y: 0},
    gravity: 0.5,
    shapes: ['square']
  });

  // Clear confetti after a certain duration
  setTimeout(() => confetti.reset(), duration);
}
