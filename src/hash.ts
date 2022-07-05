import crypto from 'crypto';
import murmur from 'murmurhash';

/**
 * Simple Hash interface/contract for simplified plug'n'play usage elsewhere (e.g. BloomFilter)
 */
export interface Hasher<T> {
  hash(hashable: T): number;
}

/**
 * Homemade hash function inspired by DJB (https://en.wikipedia.org/wiki/Daniel_J._Bernstein)
 */
export class BadHash implements Hasher<string> {
  public hash(hashable: string): number {
    return hashable
      .split('')
      .reduce((prev, curr, idx) => prev * idx + curr.charCodeAt(0), 1923);
  }
}

/**
 * Implementation of DJB's djb2 Hash (https://theartincode.stanis.me/008-djb2/)
 */
export class BetterHash implements Hasher<string> {
  public hash(hashable: string): number {
    return hashable
      .split('')
      .reduce((prev, curr) => prev * 33 + curr.charCodeAt(0), 5381);
  }
}

/**
 * Hash utilizing a (truncated) MD5 cryptographic hash (https://en.wikipedia.org/wiki/MD5)
 */
export class CryptoHash implements Hasher<string> {
  public hash(hashable: string): number {
    const hash = crypto
      .createHash('md5')
      .update(hashable, 'utf-8')
      .digest('hex');
    return parseInt(hash.substring(0, 8), 16);
  }
}

/**
 * Wrapper for MurmurHash (https://en.wikipedia.org/wiki/MurmurHash)
 */
export class ProHash implements Hasher<string> {
  public hash(hashable: string): number {
    return murmur.v3(hashable);
  }
}
