export class Bowling {
  readonly points: number = 0;
  readonly bonus: number = 0;

  public score() {
    return this.points;
  }

  public roll(pins): int {
    this.points += pins;
  }
}
