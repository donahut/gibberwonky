import { TunedBloomFilter, Quality } from './bloom';
import { Choice } from './engine';

export enum Players {
  BOROGROVE = 'Borogove',
  JUBJUB = 'Jubjub',
  BANDERSNATCH = 'Bandersnatch',
  JABBERWOCK = 'Jabberwock'
}

export enum Avatars {
  BOROGROVE = '🐗',
  JUBJUB = '🦤 ',
  BANDERSNATCH = '🦊',
  JABBERWOCK = '🐉'
}

export enum Descriptions {
  BOROGROVE = 'A shabby, not so fearsome foe',
  JUBJUB = 'A passionate, but desparate player',
  BANDERSNATCH = 'A cunning and swift mind',
  JABBERWOCK = 'The one true nonsense Monster'
}

export abstract class Player {
  abstract readonly name: Players;
  abstract readonly avatar: Avatars;
  abstract readonly desc: string;
  abstract readonly bloom: TunedBloomFilter;

  train(word: string): void {
    this.bloom.add(word);
  }

  choice(a: string, b: string): Choice {
    const realA = this.bloom.contains(a);
    const realB = this.bloom.contains(b);
    if (realA && realB) return Choice.NEITHER;
    else if (realA) return Choice.B;
    else if (realB) return Choice.A;
    else return Choice.BOTH;
  }
}

export class Borogove extends Player {
  name = Players.BOROGROVE;
  avatar = Avatars.BOROGROVE;
  desc = Descriptions.BOROGROVE;
  bloom = new TunedBloomFilter(Quality.Bad);
}

export class Jubjub extends Player {
  name = Players.JUBJUB;
  avatar = Avatars.JUBJUB;
  desc = Descriptions.JUBJUB;
  bloom = new TunedBloomFilter(Quality.Mediocre);
}

export class Bandersnatch extends Player {
  name = Players.BANDERSNATCH;
  avatar = Avatars.BANDERSNATCH;
  desc = Descriptions.BANDERSNATCH;
  bloom = new TunedBloomFilter(Quality.Good);
}

export class Jabberwock extends Player {
  name = Players.JABBERWOCK;
  avatar = Avatars.JABBERWOCK;
  desc = Descriptions.JABBERWOCK;
  bloom = new TunedBloomFilter(Quality.Superb);
}
