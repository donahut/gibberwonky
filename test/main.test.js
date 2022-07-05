const test = require('ava');
const gw_engine = require('../build/src/engine.js');
const gw_bloom = require('../build/src/bloom.js');

test.serial('True Positive Bloom Test', async (t) => {
    const engine = new gw_engine.Engine();
    const words = await engine.loadWords();
    const bloom = new gw_bloom.BloomFilter(100000);
    words.forEach(word => {
        bloom.add(word);
    });
    for (const word of words) {
        t.true(bloom.contains(word));
    }
});

async function engineSetup(name) {
    const engine = new gw_engine.Engine(name);
    await engine.init();
    return engine;
}

test.serial('Fakes are fake', async (t) => {
    const engine = await engineSetup();
    for (const fake of engine.fakes) {
        t.true(!engine.dictionary.has(fake));
    }
});

const truePositive = test.macro(async (t, name) => {
    const engine = await engineSetup(name);
    for (const real of engine.reals) {
        t.true(engine.player.bloom.contains(real));
    }
});

test.serial('Borogove True Positive', truePositive, 'Borogove');
test.serial('Jubjub True Positive ', truePositive, 'Jubjub');
test.serial('Bandersnatch True Positive', truePositive, 'Bandersnatch');
test.serial('Jabberwock True Positive', truePositive, 'Jabberwock');

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

test.serial('Borogove False Positive', falsePositive, 'Borogove', 40, 100);
test.serial('Jubjub False Positive ', falsePositive, 'Jubjub', 20, 80);
test.serial('Bandersnatch False Positive', falsePositive, 'Bandersnatch', 0, 60);
test.serial('Jabberwock False Positive', falsePositive, 'Jabberwock', 0, 20);

const accuracy = test.macro(async (t, name, min, max) => {
    const engine = await engineSetup(name);
    const slate = engine.generateSlate(20);
    let correct = 0;
    for (const matchup of slate.matchups) {
        if (engine.player.choose(matchup.a, matchup.b) === matchup.answer) {
            correct++;
        }
    }
    console.log(`${name} Accuracy: ${correct} / ${slate.matchups.length}`)
    t.true(correct >= min && correct <= max);
});

test.serial('Borogove Accuracy', accuracy, 'Borogove', 0, 14);
test.serial('Jubjub Accuracy', accuracy, 'Jubjub', 4, 16);
test.serial('Bandersnatch Accuracy', accuracy, 'Bandersnatch', 10, 20);
test.serial('Jabberwock Accuracy', accuracy, 'Jabberwock', 14, 20);