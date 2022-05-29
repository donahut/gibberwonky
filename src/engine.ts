import { promises as fs } from 'fs';
import wordListPath from 'word-list';
import { Chance } from 'chance';

import {
  Player,
  Borogove,
  Jubjub,
  Bandersnatch,
  Jabberwock,
  Players
} from './players';

const { Pronounceable } = require('@eudes/pronounceable');

export enum Choice {
  A,
  B,
  BOTH,
  NEITHER
}

export interface Matchup {
  a: string;
  b: string;
  answer: Choice;
}

export interface Slate {
  matchups: Matchup[];
}

export class Engine {
  private chancer: Chance.Chance;
  private pronouncer: typeof Pronounceable;

  private dictionary: Set<string>;
  private reals: Set<string>;
  private fakes: Set<string>;

  public player: Player;

  constructor(player: Players) {
    this.dictionary = new Set();
    this.reals = new Set();
    this.fakes = new Set();

    switch (player) {
      default:
      case Players.BOROGROVE:
        this.player = new Borogove();
        break;
      case Players.JUBJUB:
        this.player = new Jubjub();
        break;
      case Players.BANDERSNATCH:
        this.player = new Bandersnatch();
        break;
      case Players.JABBERWOCK:
        this.player = new Jabberwock();
        break;
    }

    this.chancer = new Chance();
    this.pronouncer = new Pronounceable();
  }

  async init() {
    await this.loadAndTrain();
    this.generateFakes();
  }

  private async loadAndTrain() {
    const words = await this.loadWords();
    this.shuffle(words); // mutates in place
    words.forEach((word) => {
      this.dictionary.add(word);
      if (this.pronouncer.score(word) <= 0.05) {
        this.player.train(word);
        if (this.reals.size < 100 && word !== 'neither' && word !== 'both') {
          this.reals.add(word);
        }
      }
    });
  }

  private async loadWords() {
    const data = await fs.readFile(wordListPath, 'utf8');
    const buffer = Buffer.from(data, 'utf-8');
    const words = buffer.toString().split('\n');
    return words.filter((word) => word.length > 3);
  }

  // https://stackoverflow.com/a/12646864
  private shuffle(words: string[]) {
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
  }

  private generateFakes(amount = 100) {
    while (this.fakes.size < amount) {
      const nonce = this.chancer.word();
      if (
        nonce.length > 3 &&
        !this.dictionary.has(nonce) &&
        !this.fakes.has(nonce) &&
        this.pronouncer.score(nonce) > 0.2
      ) {
        this.fakes.add(nonce);
      }
    }
  }

  generateSlate(matchups = 10): Slate {
    const realItr = this.reals.values();
    const fakeItr = this.fakes.values();
    const slate: Slate = {
      matchups: []
    };
    for (let i = 0; i < matchups; i++) {
      const roll = this.chancer.d4();
      let a: string, b: string, answer: Choice;
      if (roll === 1) {
        a = realItr.next().value;
        b = fakeItr.next().value;
        answer = Choice.B;
      } else if (roll === 2) {
        a = fakeItr.next().value;
        b = realItr.next().value;
        answer = Choice.A;
      } else if (roll === 3) {
        a = realItr.next().value;
        b = realItr.next().value;
        answer = Choice.NEITHER;
      } else {
        a = fakeItr.next().value;
        b = fakeItr.next().value;
        answer = Choice.BOTH;
      }
      slate.matchups.push({
        a,
        b,
        answer
      });
    }
    return slate;
  }
}
