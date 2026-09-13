import confetti from 'canvas-confetti'

export function celebrateAllTasksDone() {
  void confetti({
    particleCount: 120,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#8fe911', '#427800', '#FFC700', '#41BBC7'],
    disableForReducedMotion: true,
  })
}
