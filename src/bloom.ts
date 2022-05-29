import { Hasher, BadHash, BetterHash, ProHash, CryptoHash } from './hash';

export enum Quality {
  Bad,
  Mediocre,
  Good,
  Superb
}

export class BloomFilter {
  private bits: number;
  private bitarray: Uint8Array;
  private hashers: Hasher<string>[];

  constructor(bits: number, hashers?: Hasher<string>[]) {
    this.bits = bits;
    this.hashers = hashers ?? [
      new ProHash(),
      new BetterHash(),
      new CryptoHash()
    ];
    this.bitarray = new Uint8Array(this.bits).fill(0);
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

export class TunedBloomFilter extends BloomFilter {
  constructor(quality: Quality) {
    switch (quality) {
      case Quality.Bad:
        super(100000, [new BadHash()]);
        break;
      case Quality.Mediocre:
        super(100000, [new BetterHash()]);
        break;
      case Quality.Good:
        super(400000, [new CryptoHash()]);
        break;
      case Quality.Superb:
        super(800000, [new ProHash(), new BetterHash(), new CryptoHash()]);
        break;
    }
  }
}
