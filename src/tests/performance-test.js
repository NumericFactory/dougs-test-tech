import { fakeData } from './test-data.js';
import Benchmark from 'benchmark';
const suite = new Benchmark.Suite('My performance test');
console.log('TEST PERFORMANCE');
console.log('****************');

/**
 * Returns a random number between min and max
 */
function intbtw(min, max) {
    return Math.floor(
        Math.random() * (max - min + 1) + min
    )
}
const values = [];

for (let i = 0; i < 1000; i++) {
    let index = intbtw(0, 3);
    values.push(fakeData.movements[index]);
}
console.log('data length: ', values.length);

// test perf with reduce
export function clearDuplicatedMovementsWithReduce(movements) {
    let filteredMovements = movements.reduce((acc, current) => {
        const x = acc.find(item => item.date === current.date && item.wording === current.wording && item.amount === current.amount);
        return (!x) ? acc.concat([current]) : acc;
    }, []);
    return filteredMovements;
}

// test perf with Array.prototype.from()
export function clearDuplicatedMovementsWithArrayFrom(movements) {
    const filteredMovements = Array.from(new Set(movements.map(a => a.id))).map(id => {
        return movements.find(a => a.id === id)
    })
    return filteredMovements;
}

// test perf with for of
export function clearDuplicatedMovementsWithForOf(movements) {
    let filteredMovements = [];
    for (let obj of movements) {
        if (filteredMovements.find((el) => {
            el.id === obj.id && el.date === obj.date &&
                el.wording === obj.wording && el.amount === obj.amount
        }) === undefined) {
            filteredMovements.push(obj)
        }
    }
    return filteredMovements;
}

// test perf with for loop
export function clearDuplicatedMovementsWithForLoop(movements) {
    let filteredMovements = [];
    for (let i = 0; i < movements.length; i++) {
        if (filteredMovements.find((el) => {
            el.id === movements[i].id &&
                el.date === movements[i].date &&
                el.wording === movements[i].wording &&
                el.amount === movements[i].amount
        }) === undefined) {
            filteredMovements.push(movements[i])
        }
    }
    return filteredMovements;
}


suite
    .add('clear duplicated entries with Reduce', () => {
        const processed = clearDuplicatedMovementsWithReduce(values);
    })
    .add('with Array.prototype.from()', () => {
        const processed = clearDuplicatedMovementsWithArrayFrom(values);
    })
    .add('with for of', () => {
        const processed = clearDuplicatedMovementsWithForOf(values);
    })
    .add('with for loop', () => {
        const processed = clearDuplicatedMovementsWithForLoop(values);
    })

    .on('cycle', event => {
        const benchmark = event.target;
        console.log(benchmark.toString());
    })
    .on('complete', event => {
        const suite = event.currentTarget;
        const fastestOption = suite.filter('fastest').map('name');
        console.log(`The fastest option is ${fastestOption}`);
    })
    .run();
