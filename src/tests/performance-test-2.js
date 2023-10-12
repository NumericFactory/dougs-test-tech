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
 * performance benchmark of 4 functions *
*****************************************/

// 1. test perf with for loop
function clearDuplicatedWithForLoop(arr) {
    const uniqueArray = [];
    const seenItems = {}; // Keep track of seen items in arr
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        const { date, wording, amount } = obj;
        // Create a unique key based on "date", 'wording', and "amount" properties
        const key = `${date}-${wording}-${amount}`;
        if (!seenItems[key]) {
            uniqueArray.push(obj);
            seenItems[key] = true;
        }
    }
    return uniqueArray;
}

// 2. test perf with for loop (and findIndex)
export function clearDuplicatedWithForLoopAndFindIndex(arr) {
    let filteredArr = [];
    for (let i = 0; i < arr.length; i++) {
        let firstIndexFound = arr.findIndex(({ date, wording, amount }) => {
            return date === arr[i].date && wording === arr[i].wording && amount === arr[i].amount
        });
        if (firstIndexFound === i) {
            filteredArr.push(arr[firstIndexFound])
        }
    }
    return filteredArr
}


// 3. test perf with filter (and FindIndex)
export function clearDuplicatedWithFilter(arr) {
    arr.filter((v, i, a) => a.findIndex(v2 => ['data', 'wording', 'amount'].every(k => v2[k] === v[k])) === i)
}

// 4. test perf with filter (and includes)
export function clearDuplicatedWithFilterAndIncludes(arr) {
    const objToStr = ({ date, wording, amount }) => `${date}/${wording}/${amount}`;
    const strings = arr.map(objToStr);
    return arr.filter((item, index) => !strings.includes(objToStr(item), index + 1));
}



// PERFORM 4 TESTS
suite
    .add('with for loop', () => {
        const processed = clearDuplicatedWithForLoop(values);
    })
    .add('with for loop and findIndex', () => {
        const processed = clearDuplicatedWithForLoopAndFindIndex(values);
    })
    .add('with filter', () => {
        const processed = clearDuplicatedWithFilter(values);
    })
    .add('with filter and includes', () => {
        const processed = clearDuplicatedWithFilterAndIncludes(values);
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
