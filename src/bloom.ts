import { Hasher, BadHash } from './hash';

export class BloomFilter {
  private bits: number;
  private bitarray: Array<number>;
  private hashers: Array<Hasher<string>>;

  constructor(bits: number) {
    this.bits = bits;
    this.bitarray = new Array(this.bits).fill(0);
    this.hashers = [];
  }

  init() {
    this.hashers.push(new BadHash(this.bits));
  }

  add(element: string) {
    this.hashers.forEach((hasher) => {
      this.bitarray[hasher.hash(element) % this.bits] = 1;
    });
  }

  contains(element: string) {
    this.hashers.every(
      (hasher) => this.bitarray[hasher.hash(element) % this.bits] === 1
    );
  }
}
