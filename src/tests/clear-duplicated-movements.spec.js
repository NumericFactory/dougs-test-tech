// imports 
import { describe, expect, test } from '@jest/globals';
import { clearDuplicatedMovements } from '../index'

// data available for test
let movements = [];
let realBalanceFromBank = 0;

/**
 * TESTS SUIT name : delete duplicated movements
 * > Test 1 : param Should be an Array of Movement
 */
describe('clear duplicated movements', () => {

    // avant chaque test, on set les data *realBalanceFromBank et *movements
    beforeEach(() => {
        realBalanceFromBank = {
            date: new Date('2023-10-31'),
            balance: 601.5
        };
        movements = [
            { id: 1, date: new Date('2023-10-04 21:09:00'), wording: 'Facture EDF', amount: -150.50 },
            { id: 2, date: new Date('2023-10-05 17:57:00'), wording: 'Achat CDiscount', amount: -359 },
            { id: 3, date: new Date('2023-10-06 15:30:00'), wording: 'Achat boulanger', amount: -119 },
            { id: 4, date: new Date('2023-10-04 21:09:00'), wording: 'Facture client F021234', amount: 1230 }
        ];
    });

    /**
     * test 1 : SUPPRIMER LES DOUBLONS
    */
    it('Should clear duplicated movements', () => {
        // we add duplicated entries for the test
        let duplicatedMovements = [...movements, movements[3], movements[1], movements[3]]
        console.log(duplicatedMovements)
        expect(clearDuplicatedMovements(duplicatedMovements)).toEqual(expect.arrayContaining([...movements]))
    })


})
