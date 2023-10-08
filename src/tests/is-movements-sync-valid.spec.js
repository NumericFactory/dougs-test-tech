// imports 
import { describe, expect, test } from '@jest/globals';
import { fakeData } from './test-data';
import { isMovementsSyncValid } from '../index';

// data available for test
let movements = [];
let realBalanceFromBank;

/**
 * TESTS SUIT name : matching sum of movements amount, with real balance from bank
 * > Test 1 Should return true,  if sum of movements === realBalanceFromBank
 * > Test 2 Should return false, if movements have a duplicated entry
 * > Test 3 Should return false, if movements have a missing entry
 */
describe('matching real balance from bank, with sum of movements amount', () => {

    // avant chaque test, on set les données *realBalanceFromBank et *movements (voir './test-data.js')
    beforeEach(() => {
        realBalanceFromBank = fakeData.realBalanceFromBank;
        movements = fakeData.movements;
    });

    /**
     * test 1 : SUCCES DE LA SYNCHRONISATION BANCAIRE
     *          return true, si l'addition du montant de chaque opération === realBalanceFromBank
     *          La syncrhonisation des opérations ne comporte pas d'erreurs
    */
    it('Should return true if sum of movements === RealBankBalance', () => {
        expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(true)
    })

    /**
     * test 2 : LE CAS DU DOUBLON
     *          return false, si une opération est dupliquée dans la liste des opérations
     *          (l'addition du montant de chaque opération != realBalanceFromBank)
    */
    it('Should return false if movements have a duplicated entry', () => {
        // we add fake duplicated entry
        movements = [...movements, movements[3]];
        expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(false);
    });

    /**
     * test 3 : LE CAS DU MANQUANT 
     *          return false, si une opération est manquante dans la liste des opérations
     *          (l'addition du montant de chaque opération != realBalanceFromBank)
    */
    it('Should return false if movements have a missing entry', () => {
        // we delete an entry (ex: movement.id:4)
        movements = movements.filter(mov => mov.id != 4);
        expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(false);
    });


})

