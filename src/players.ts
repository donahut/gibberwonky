import { TunedBloomFilter, Quality } from './bloom';
import { Choice } from './engine';

/**
 * Gibberwonky Opponent Player Names
 */
export enum Players {
  BOROGROVE = 'Borogove',
  JUBJUB = 'Jubjub',
  BANDERSNATCH = 'Bandersnatch',
  JABBERWOCK = 'Jabberwock'
}

/**
 * Gibberwonky Opponent Player Avatars
 */
export enum Avatars {
  BOROGROVE = '🐗',
  JUBJUB = '🦤 ',
  BANDERSNATCH = '🦊',
  JABBERWOCK = '🐉'
}

/**
 * Gibberwonky Opponent Player Descriptions
 */
export enum Descriptions {
  BOROGROVE = 'A shabby, not so fearsome foe',
  JUBJUB = 'A passionate, but desparate player',
  BANDERSNATCH = 'A cunning and swift mind',
  JABBERWOCK = 'The one true nonsense Monster'
}

/**
 * Gibberwonky Opponent (Abstract) Player
 */
export abstract class Player {
  abstract readonly name: Players;
  abstract readonly avatar: Avatars;
  abstract readonly desc: string;
  abstract readonly bloom: TunedBloomFilter;

  train(word: string): void {
    this.bloom.add(word);
  }

  choose(a: string, b: string): Choice {
    const realA = this.bloom.contains(a);
    const realB = this.bloom.contains(b);
    if (realA && realB) return Choice.NEITHER;
    else if (realA) return Choice.B;
    else if (realB) return Choice.A;
    else return Choice.BOTH;
  }
}

/**
 * All Gibberwonky opponent player names inspired by creatures from Jabberwocky Poem
 *    https://en.wikipedia.org/wiki/Jabberwocky
 */

/**
 * Borogove, the worst Gibberwonky opponent
 */
export class Borogove extends Player {
  name = Players.BOROGROVE;
  avatar = Avatars.BOROGROVE;
  desc = Descriptions.BOROGROVE;
  bloom = new TunedBloomFilter(Quality.Bad);
}

/**
 * Jubjub, an OK/mediocre Gibberwonky opponent
 */
export class Jubjub extends Player {
  name = Players.JUBJUB;
  avatar = Avatars.JUBJUB;
  desc = Descriptions.JUBJUB;
  bloom = new TunedBloomFilter(Quality.Mediocre);
}

/**
 * Bandersnatch, a really solid, but potentially beatable Gibberwonky opponent
 */
export class Bandersnatch extends Player {
  name = Players.BANDERSNATCH;
  avatar = Avatars.BANDERSNATCH;
  desc = Descriptions.BANDERSNATCH;
  bloom = new TunedBloomFilter(Quality.Good);
}

/**
 * Jabberwock, almost perfect Gibberwonky player that's virtually impossible to beat
 */
export class Jabberwock extends Player {
  name = Players.JABBERWOCK;
  avatar = Avatars.JABBERWOCK;
  desc = Descriptions.JABBERWOCK;
  bloom = new TunedBloomFilter(Quality.Superb);
}
