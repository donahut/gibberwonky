import { Hasher, BadHash } from './hash';

export enum Quality {
  Awful,
  Bad,
  Good,
  Superb
}

export class BloomFilter {
  private bits: number;
  private bitarray: Array<number>;
  private hashers: Array<Hasher<string>>;

  constructor(quality: Quality) {
    switch (quality) {
      case Quality.Awful:
        this.bits = 1000;
        this.hashers = [new BadHash(this.bits)];
        break;
      case Quality.Bad:
        this.bits = 1000;
        this.hashers = [];
        break;
      case Quality.Good:
        this.bits = 1000;
        this.hashers = [];
        break;
      case Quality.Superb:
        this.bits = 1000;
        this.hashers = [];
        break;
    }
    this.bitarray = new Array(this.bits).fill(0);
  }

  add(element: string) {
    this.hashers.forEach((hasher) => {
      this.bitarray[hasher.hash(element) % this.bits] = 1;
    });
  }

  contains(element: string): boolean {
    return this.hashers.every(
      (hasher) => this.bitarray[hasher.hash(element) % this.bits] === 1
    );
  }

  full(): boolean {
    return this.bitarray.every((bit) => bit === 1);
  }
}
