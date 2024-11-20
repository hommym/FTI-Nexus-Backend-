


export function randomNumber(min: number = 1000, max: number = 9999): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}