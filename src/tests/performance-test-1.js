import { fakeData } from './test-data.js';
import Benchmark from 'benchmark';
import chalk from 'chalk';

chalk.level = 1; // Use colours in the VS Code Debug Window

const suite = new Benchmark.Suite('My performance test');
console.log(chalk.blueBright('TEST PERFORMANCE ALGORITHM COMPUTE VALUES IN ARRAY'));
console.log('**************************************************');

/**
 * Returns a random number between min and max
 */
function intbtw(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
const values = [];

// On créé un Array<Movement> avec 1000 entrées
for (let i = 0; i < 10000; i++) {
    let index = intbtw(0, 3);
    values.push(fakeData.movements[index]);
}
console.log('Array length for the test: ', values.length);


/****************************************
 * performance benchmark of 3 functions *
*****************************************/

// 1. test perf with for loop (and indexOf)
function computeAdditionWithForLoop(movements) {
    let result = 0;
    for (let i = 0; i < movements.length; i++) {
        result += movements[i].amount
    }
    return result;
}

// 2. test perf with for of
export function computeAdditionWithForOf(movements) {
    let result = 0;
    for (let mouv of movements) {
        result += mouv.amount
    }
    return result;
}

// 3. test perf with reduce
export function computeAdditionWithReduce(movements) {
    return movements.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
}


// PERFORM 3 TESTS
suite
    .add('with for loop', () => {
        const processed = computeAdditionWithForLoop(values);
    })
    .add('with for of', () => {
        const processed = computeAdditionWithForOf(values);
    })
    .add('with Reduce', () => {
        const processed = computeAdditionWithReduce(values);
    })

    .on('cycle', event => {
        const benchmark = event.target;
        console.log(benchmark.toString());
    })
    .on('complete', event => {
        const suite = event.currentTarget;
        const fastestOption = suite.filter('fastest').map('name');
        const slowestOption = suite.filter('slowest').map('name');
        console.log(chalk.green(`The fastest option is ${fastestOption}`));
        console.log(chalk.yellow(`The slowest option is ${slowestOption}`));
    })
    .run();
