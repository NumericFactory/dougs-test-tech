// imports 
import { describe, expect, test } from '@jest/globals';
import { fakeData } from './test-data';
import { algoFinal } from '../index';

// data available for test
let movements = [];
let realBalanceFromBank = 0;

/**
 * TESTS SUIT name : delete duplicated movements
 * > Test 1 : Should clear duplicated movements in Array<Movement>
 */
describe('FINAL ALGO : clear duplicated movements and compute', () => {

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
        expect(algoFinal(duplicatedMovements, realBalanceFromBank).uniqueMovements.length).toEqual(movements.length); // =>4
        expect(algoFinal(duplicatedMovements, realBalanceFromBank).uniqueMovements).toEqual(expect.arrayContaining([...movements]));
    });

    /**
     * test 2 : Verifier que sum of uniqueMovemments=== sum of originalMovements
    */
    it('Should return uniqueMovements.balance equal to sum of movements.amount', () => {
        // we compute sum of original array
        let sum = movements.reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0);
        // we add 3 duplicated entries for the test
        let duplicatedMovements = [...movements, movements[3], movements[1], movements[3]];
        expect(algoFinal(duplicatedMovements, realBalanceFromBank).balance).toEqual(sum); // 601.50
    });

    /**
     * test 3 : si pas de manquants, TRUE (uniqueMovements.balance === RealBankBalance)
    */
    it('Should return true if uniqueMovements.balance === RealBankBalance', () => {
        // we add 3 duplicated entries for the test
        let duplicatedMovements = [...movements, movements[3], movements[1], movements[3]];
        expect(algoFinal(duplicatedMovements, realBalanceFromBank).isSyncValid).toEqual(true); // 601.50
    });

    /**
     * test 4 : si manquant(s), FALSE (uniqueMovements.balance != RealBankBalance)
    */
    it('Should return false if uniqueMovements.balance ! = RealBankBalance', () => {
        // we delete 1 entry for the test
        let movementsWithoutID3 = movements.filter(item => item.id != 3)
        expect(algoFinal(movementsWithoutID3, realBalanceFromBank).isSyncValid).toEqual(false);
    });

})
