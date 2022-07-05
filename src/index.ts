import readline from 'readline-sync';

import { Engine } from './engine';
import { Avatars, Descriptions, Players } from './players';

async function main() {
  console.log(
    `\n💥   Welcome to Gibberwonky!  💥\n
    "It's a whole lot of nonsense!"\n`
  );
  console.log(
    `Here's how it works:\n
    - It's a 1-on-1, Man vs. Machine showdown\n
    - I'll present you both with two words\n
    - You both tell me if: one, both or neither are fake\n
    - Most correct responses by the end of 10 rounds wins... The Vorpal Cup!\n`
  );

  let engine: Engine;
  let initPr: Promise<void>;

  // Ready to play / Opponent choice
  if (readline.keyInYN('Are you ready to play?')) {
    console.log(`\nAll right! Let's choose your opponent...`);
    const champions = [
      ` ${Avatars.BOROGROVE}  ${Players.BOROGROVE}\t ${Descriptions.BOROGROVE}`,
      ` ${Avatars.JUBJUB}  ${Players.JUBJUB}\t\t ${Descriptions.JUBJUB}`,
      ` ${Avatars.BANDERSNATCH}  ${Players.BANDERSNATCH}\t ${Descriptions.BANDERSNATCH}`,
      ` ${Avatars.JABBERWOCK}  ${Players.JABBERWOCK}\t ${Descriptions.JABBERWOCK}`
    ];
    const choice = readline.keyInSelect(champions, 'Who will it be?');
    if (choice === -1) {
      console.log(`I understand, they're pretty intimidating!`);
      process.exit();
    }

    // Initialize engine
    const opponent = Object.values(Players)[choice];
    engine = new Engine(opponent);
    initPr = engine.init();

    console.log(
      `\nYou picked...  ${engine.player.avatar}  ${engine.player.name}  ${engine.player.avatar}   "${engine.player.desc}!"\n`
    );
  } else {
    console.log('No worries, come back anytime!');
    process.exit();
  }

  // Wait for engine word-list load/train
  console.log('Get ready to...\n');
  await initPr;
  console.log('SPOT! THE! FAKE!\n');

  // Initialize game state
  const slate = engine.generateSlate();
  let round = 0;
  let playerScore = 0;
  let botScore = 0;
  let forfeited = false;

  // Sleep for dramatic effect
  await new Promise((r) => setTimeout(r, 1000));

  // Play rounds
  while (round < slate.matchups.length && !forfeited) {
    console.log(`🥊   Round ${round + 1}   🥊 \n`);

    const interfaceChoices = {
      A: slate.matchups[round].a.toUpperCase(),
      B: slate.matchups[round].b.toUpperCase(),
      BOTH: 'BOTH',
      NEITHER: 'NEITHER'
    };

    // Sleep for dramatic effect
    await new Promise((r) => setTimeout(r, 500));

    // Pose choice to user
    console.log(`🕵️   Which is the fake... \n`);
    console.log(`❔  ${interfaceChoices.A}  or  ${interfaceChoices.B}  ❔`);

    // Gather user & bot answers
    const choices = Object.values(interfaceChoices);
    const choice = readline.keyInSelect(choices, 'Is it...') as number;
    if (choice === -1) {
      forfeited = true;
      continue;
    }
    const playerAnswer = choice;
    const botAnswer = engine.player.choose(
      slate.matchups[round].a,
      slate.matchups[round].b
    );
    const answer = slate.matchups[round].answer;

    // Round feedback to user
    console.log(`\nYou said: ${choices[choice]}\n`);
    console.log(`${engine.player.avatar} said: ${choices[botAnswer]}\n`);
    console.log(`The correct answer was... ${choices[answer]}\n`);
    if (playerAnswer === answer && botAnswer !== answer) {
      console.log(`✨  You got it! Take that ${engine.player.name}! 😎 \n`);
    } else if (playerAnswer === answer && botAnswer === answer) {
      console.log(`✨  You got it... but so did ${engine.player.name} 😬 \n`);
    } else if (playerAnswer !== answer && botAnswer === answer) {
      console.log(
        `❌  You lost this one... but ${engine.player.name} didn't! 😱 \n`
      );
    } else {
      console.log(
        `❌  You lost this one... but at least you both flubbed it... 😮‍💨 \n`
      );
    }

    // Update score
    playerScore += +(playerAnswer === answer);
    botScore += +(botAnswer === answer);
    console.log(`You  ${playerScore} - ${botScore}  ${engine.player.name}\n`);
    console.log(`--------------------\n`);
    round++;
  }

  // Endgame recaps to user
  if (forfeited) {
    console.log(`--------------------\n`);
    console.log(
      `You forfeited The Vorpal Cup 🏆  to  ${engine.player.avatar} ${engine.player.name} ${engine.player.avatar} !\n`
    );
  } else if (playerScore > botScore) {
    console.log(
      `🎉  You did it!  🎉  You beat  ${engine.player.avatar} ${engine.player.name} ${engine.player.avatar}  for The Vorpal Cup! 🏆 \n`
    );
  } else if (botScore > playerScore) {
    console.log(
      `😞  Unfortunately, you lost The Vorpal Cup 🏆  to  ${engine.player.avatar} ${engine.player.name} ${engine.player.avatar} !\n`
    );
  } else {
    console.log(`Womp womp... it's a tie... Better luck next time!\n`);
  }
}

(async () => {
  await main();
})();
