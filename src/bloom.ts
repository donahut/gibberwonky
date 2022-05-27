import { Hasher, BadHash, BetterHash, ProHash, CryptoHash } from './hash';

export enum Quality {
  Bad,
  Mediocre,
  Good,
  Superb
}

export class BloomFilter {
  private bits: number;
  private bitarray: Array<number>;
  private hashers: Array<Hasher<string>>;

  constructor(quality: Quality) {
    switch (quality) {
      case Quality.Bad:
        this.bits = 300000;
        this.hashers = [new BadHash()];
        break;
      case Quality.Mediocre:
        this.bits = 150000;
        this.hashers = [new CryptoHash()];
        break;
      case Quality.Good:
        this.bits = 200000;
        this.hashers = [new BetterHash()];
        break;
      case Quality.Superb:
        this.bits = 600000;
        this.hashers = [new ProHash(), new CryptoHash()];
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
