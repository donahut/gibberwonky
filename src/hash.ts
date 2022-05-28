import crypto from 'crypto';
import murmur from 'murmurhash';

export interface Hasher<T> {
  hash(hashable: T): number;
}

export class BadHash implements Hasher<string> {
  public hash(hashable: string): number {
    return hashable
      .split('')
      .reduce((prev, curr, idx) => prev * idx + curr.charCodeAt(0), 1923);
  }
}

export class BetterHash implements Hasher<string> {
  public hash(hashable: string): number {
    return hashable
      .split('')
      .reduce((prev, curr) => prev * 33 + curr.charCodeAt(0), 5381);
  }
}

export class CryptoHash implements Hasher<string> {
  public hash(hashable: string): number {
    const hash = crypto
      .createHash('md5')
      .update(hashable, 'utf-8')
      .digest('hex');
    return parseInt(hash.substring(0, 8), 16);
  }
}

export class ProHash implements Hasher<string> {
  public hash(hashable: string): number {
    return murmur.v3(hashable);
  }
}
