import { Bowling } from './bowling';

describe('Bowling', () => {
  let bowling;

  beforeEach(() => {
    this.bowling = new Bowling(); 
  });

  describe('a game of of no strikes or spares', () => {
    it('#score returns 0 when no pins are knocked over', () => {
      expect(this.bowling.score()).toBe(0);
    });

    it('#score returns 40 when 2 pins per roll are knocked over', () => {
      for(let i = 20; i > 0; i--) {
        this.bowling.roll(2);
      }

      expect(this.bowling.score()).toBe(40);
    });
  });

  describe('a game of one or more spares', () => {
    it('returns 86 when the bowler only knocks over 4 pins per roll and gets one spare', () => {
      for(let i = 3; i > 0; i--) {
        this.bowling.roll(4);
      }
      this.bowling.roll(6);
      for(let i = 16; i > 0; i--) {
        this.bowling.roll(4);
      }

      expect(this.bowling.score()).toBe(86);
    });
  });
});
