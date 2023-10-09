import { fakeData } from './test-data.js';
import Benchmark from 'benchmark';
import chalk from 'chalk';

chalk.level = 1; // Use colours in the VS Code Debug Window

const suite = new Benchmark.Suite('My performance test');
console.log(chalk.blueBright('TEST PERFORMANCE ALGORITHM CLEAR DUPLICATED ENTRIES IN ARRAY'));
console.log('************************************************************');

/**
 * Returns a random number between min and max
 */
function intbtw(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
const values = [];

// On créé un Array<Movement> avec 1000 entrées et des doublons
for (let i = 0; i < 1000; i++) {
    let index = intbtw(0, 3);
    values.push(fakeData.movements[index]);
}
console.log('Array length for the test: ', values.length);


/****************************************
 * performance benchmark of 6 functions *
*****************************************/

// 1. test perf with for loop (and indexOf)
function clearDuplicatedWithForLoopAndIndexof(arr) {
    const filteredMovements = [];
    for (let i = 0; i < arr.length; i++) {
        if (filteredMovements.indexOf(arr[i]) === -1) {
            filteredMovements.push(arr[i]);
        }
    }
    return filteredMovements;
}

// 2. test perf with for loop (and find)
export function clearDuplicatedWithForLoopAndFind(movements) {
    let filteredMovements = [];
    for (let i = 0; i < movements.length; i++) {
        if (filteredMovements.find((el) => {
            el.date === movements[i].date && el.wording === movements[i].wording && el.amount === movements[i].amount
        }) === undefined) {
            filteredMovements.push(movements[i])
        }
    }
    return filteredMovements;
}

// 3. test perf with for of
export function clearDuplicatedWithForOf(movements) {
    let filteredMovements = [];
    for (let obj of movements) {
        if (filteredMovements.find((el) => {
            el.date === obj.date && el.wording === obj.wording && el.amount === obj.amount
        }) === undefined) {
            filteredMovements.push(obj)
        }
    }
    return filteredMovements;
}

// 4. test perf with filter (and index of)
export function clearDuplicatedWithFilter(arr) {
    return arr.filter((item, index) => arr.indexOf(item) === index);
}

// 5. test perf with reduce
export function clearDuplicatedWithReduce(movements) {
    let filteredMovements = movements.reduce((acc, current) => {
        const x = acc.find(item => item.date === current.date && item.wording === current.wording && item.amount === current.amount);
        return (!x) ? acc.concat([current]) : acc;
    }, []);
    return filteredMovements;
}

// 6. test perf with Array.prototype.from()
export function clearDuplicatedWithArrayFrom(movements) {
    const filteredMovements = Array.from(new Set(movements))
    return filteredMovements;
}

// PERFORM 6 TESTS
suite
    .add('with for loop and indexOf', () => {
        const processed = clearDuplicatedWithForLoopAndIndexof(values);
    })
    .add('with for loop and find', () => {
        const processed = clearDuplicatedWithForLoopAndFind(values);
    })
    .add('with for of', () => {
        const processed = clearDuplicatedWithForOf(values);
    })
    .add('with filter', () => {
        const processed = clearDuplicatedWithFilter(values);
    })
    .add('with Reduce', () => {
        const processed = clearDuplicatedWithReduce(values);
    })
    .add('with Array.prototype.from()', () => {
        const processed = clearDuplicatedWithArrayFrom(values);
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
