# gibberwonky

*"It's a whole lot of nonsense!"*

## Description
Inspired by the [Lewis Carroll](https://en.wikipedia.org/wiki/Lewis_Carroll) poem [Jabberwocky](https://en.wikipedia.org/wiki/Jabberwocky), **Gibberwonky** is a game about spotting the nonsense.

### How it Works
- It's you vs. a computer opponent
  - There are 4 potential challengers (Borogove, Jubjub, Bandersnatch and Jabberwock) and each is a tougher and tougher challenge
- Each player is given the same pair of "words"
- It is your job to say whether one, both, or neither of those words are *fake*
- There are 10 rounds and the player with the most correct responses in the end wins *The Vorpal Cup*

## Getting Started
0. Install `node` on your system (v16)
1. `npm install`
2. `npm run build`
3. `node ./build/src/index.js`

### Example Interaction
```
node ./build/src/index.js

💥   Welcome to Gibberwonky!  💥

    "It's a whole lot of nonsense!"

Here's how it works:

    - It's a 1-on-1, Man vs. Machine showdown

    - I'll present you both with two words

    - You both tell me if: one, both or neither are fake

    - Most correct responses by the end of 10 rounds wins... The Vorpal Cup!

Are you ready to play? [y/n]: y

All right! Let's choose your opponent...

[1] 🐗  Borogove	 A shabby, not so fearsome foe
[2] 🦤   Jubjub		 A passionate, but desparate player
[3] 🦊  Bandersnatch	 A cunning and swift mind
[4] 🐉  Jabberwock	 The one true nonsense Monster
[0] CANCEL

Who will it be? [1...4 / 0]: 1

You picked...  🐗  Borogove  🐗   "A shabby, not so fearsome foe!"

Get ready to...

SPOT! THE! FAKE!

🥊   Round 1   🥊

🕵️   Which is the fake...

❔  SCHNORRED  or  ZATER  ❔

[1] SCHNORRED
[2] ZATER
[3] BOTH
[4] NEITHER
[0] CANCEL

Is it... [1...4 / 0]: 3

You said: BOTH

🐗 said: NEITHER

The correct answer was... ZATER

❌  You lost this one... but at least you both flubbed it... 😮‍💨

You  0 - 0  Borogove
```

## `TODO`
There's various improvements and features on the roadmap:

- Improve the fake word generation
  - Currently, to make the game a challenge, it's necessary to choose very esoteric *real* words so that they're more akin to the fake words
- Varying degrees of real/fake word difficulty
  - Due to the above, we can't have easier real words because it would make the fakes too obvious. Once we've solved that, we could add different difficulty modes to make the game more fun for a wider range of players
- Lifetime stats
  - In a [Wordle](https://en.wikipedia.org/wiki/Wordle) world, people want stats! So let's give it to them!
- Create a more interactive, non-CLI interface. Maybe a webapp or mobile app?
- Project clean-up
  - Currently, the various pieces of Gibberwonky might be useful in other word games, but the project isn't set-up to make them easily available as libraries/functions; it'd be nice to do that (e.g. my Wordle simulator, [Schmerdle](https://github.com/donahut/schmerdle))
  - Better isolate game UI from game engine loop

## Resources

### Bloom Filters & Hashing
- http://codekata.com/kata/kata05-bloom-filters/
- https://en.wikipedia.org/wiki/Bloom_filter
- https://github.com/Baqend/Orestes-Bloomfilter/blob/master/README.md
- https://burtleburtle.net/bob/hash/doobs.html
- https://llimllib.github.io/bloomfilter-tutorial/
- https://theartincode.stanis.me/008-djb2/