const test = require('ava');
const gw_engine = require('../build/src/engine.js');
const gw_players = require('../build/src/players.js');
const gw_bloom = require('../build/src/bloom.js');

test.serial('True Positive Bloom Test', async (t) => {
    const engine = new gw_engine.Engine();
    const words = await engine.loadWords();
    const bad_bloom = new gw_bloom.BloomFilter(0);
    const med_bloom = new gw_bloom.BloomFilter(1);
    const good_bloom = new gw_bloom.BloomFilter(2);
    const sup_bloom = new gw_bloom.BloomFilter(3);
    words.forEach(word => {
        bad_bloom.add(word);
        med_bloom.add(word);
        good_bloom.add(word);
        sup_bloom.add(word);
    });
    for (const word of words) {
        t.true(bad_bloom.contains(word));
        t.true(med_bloom.contains(word));
        t.true(good_bloom.contains(word));
        t.true(sup_bloom.contains(word));
    }
});

async function engineSetup(name) {
    const engine = new gw_engine.Engine(name);
    await engine.init();
    return engine;
}

const falsePositive = test.macro(async (t, name, min, max) => {
    const engine = await engineSetup(name);

    let fpositives = 0;
    for (const fake of engine.fakes) {
        if (engine.player.bloom.contains(fake))
            fpositives++;
    }
    console.log(`${name} FP Rate: ${fpositives} / ${engine.fakes.size}`)
    t.true(fpositives >= min && fpositives <= max);
});

test('False Positive Borogove Test', falsePositive, 'Borogove', 60, 100);
test('False Positive Jubjub Test', falsePositive, 'Jubjub', 40, 80);
test('False Positive Bandersnatch Test', falsePositive, 'Bandersnatch', 20, 60);
test('False Positive Jabberwock Test', falsePositive, 'Jabberwock', 0, 40);

const accuracy = test.macro(async (t, name, min, max) => {
    const engine = await engineSetup(name);
    const slate = engine.generateSlate(20);

    let correct = 0;
    for (const matchup of slate.matchups) {
        if (engine.player.choice(matchup.a, matchup.b) === matchup.answer)
            correct++;
    }
    console.log(`${name} Accuracy: ${correct} / ${slate.matchups.length}`)
    t.true(correct >= min && correct <= max);
});

test('Borogove Accuracy Test', accuracy, 'Borogove', 0, 8);
test('Jubjub Accuracy Test', accuracy, 'Jubjub', 4, 12);
test('Bandersnatch Accuracy Test', accuracy, 'Bandersnatch', 10, 18);
test('Jabberwock Accuracy Test', accuracy, 'Jabberwock', 16, 20);