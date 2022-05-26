export interface Hasher<T> {
  hash(hashable: T): number;
}

export class BadHash implements Hasher<string> {
  private bits: number;

  constructor(bits: number) {
    this.bits = bits;
  }

  public hash(hashable: string): number {
    return hashable
      .split('')
      .reduce((prev, curr) => prev + curr.charCodeAt(0), 0);
  }
}
