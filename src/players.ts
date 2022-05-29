import { BloomFilter, Quality } from './bloom';
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

export abstract class Player {
  abstract readonly bloom: BloomFilter;
  abstract readonly name: Players;
  abstract readonly avatar: Avatars;

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
  bloom = new BloomFilter(Quality.Bad);
}

export class Jubjub extends Player {
  name = Players.JUBJUB;
  avatar = Avatars.JUBJUB;
  bloom = new BloomFilter(Quality.Mediocre);
}

export class Bandersnatch extends Player {
  name = Players.BANDERSNATCH;
  avatar = Avatars.BANDERSNATCH;
  bloom = new BloomFilter(Quality.Good);
}

export class Jabberwock extends Player {
  name = Players.JABBERWOCK;
  avatar = Avatars.JABBERWOCK;
  bloom = new BloomFilter(Quality.Superb);
}
