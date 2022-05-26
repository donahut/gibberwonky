//import { ReadLine } from 'readline';
import { Command } from 'commander';

import { Engine } from './engine';
import { Players } from './players';

/**
 * Validate all provided arguments
 */
function validate() {
  const program = new Command();
  program.parse(process.argv);
  return program.opts();
}

async function main() {
  const opts = validate();
  const engine = new Engine(Players.BOROGROVE);
  await engine.init();

  // Initialize game state
  const slate = engine.generateSlate();

  // Play rounds
  console.log('Spot the Fake!');
  for (let round = 0; round < slate.matchups.length; round++) {
    console.log(`${slate.matchups[round].a} vs. ${slate.matchups[round].b} ?`);
    console.log(
      `${slate.matchups[round].answer} vs. ${engine.player.choice(
        slate.matchups[round].a,
        slate.matchups[round].b
      )}`
    );
    console.log('\n');
  }
}

(async () => {
  await main();
})();
