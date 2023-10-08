// imports 
import { describe, expect, test } from '@jest/globals';
import { isMovementsSyncValid } from '../index';
// import { Movement, Balance } from '../interfaces/data-model';

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

