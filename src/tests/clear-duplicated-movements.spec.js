// imports 
import { describe, expect, test } from '@jest/globals';
import { fakeData } from './test-data';
import { clearDuplicatedMovements } from '../index';

// data available for test
let movements = [];
let realBalanceFromBank = 0;

/**
 * TESTS SUIT name : delete duplicated movements
 * > Test 1 : Should clear duplicated movements in Array<Movement>
 */
describe('clear duplicated movements', () => {

    // avant chaque test, on set les données *realBalanceFromBank et *movements (voir './test-data.js')
    beforeEach(() => {
        realBalanceFromBank = fakeData.realBalanceFromBank;
        movements = fakeData.movements;
    });

    /**
     * test 1 : SUPPRIMER LES DOUBLONS
    */
    it('Should clear duplicated movements in Array<Movement>', () => {
        // we add 3 duplicated entries for the test
        let duplicatedMovements = [...movements, movements[3], movements[1], movements[3]];
        expect(clearDuplicatedMovements(duplicatedMovements).length).toEqual(movements.length); // =>4
        expect(clearDuplicatedMovements(duplicatedMovements)).toEqual(expect.arrayContaining([...movements]));
    });


})
