import { Command } from 'commander';
// import { Engine } from './engine';

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
  /* const engine = new Engine();
  engine.init(); */
}

(async () => {
  await main();
})();
