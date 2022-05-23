export interface Hasher<T> {
  hash(hashable: T): number;
}

export class BadHash implements Hasher<string> {
  private bits: number;

  constructor(bits: number) {
    this.bits = bits;
  }

  public hash(hashable: string): number {
    const min = Math.ceil(0);
    const max = Math.floor(this.bits);
    const seed = Math.floor(Math.random() * (max - min) + min);
    return hashable
      .split('')
      .reduce((prev, curr) => prev + curr.charCodeAt(0), seed);
  }
}
