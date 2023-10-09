/**
 * @Author : Frederic LOSSIGNOL
 * CREATE ALGORITHM(S) TO SOLVE 2 PROBLEMS
 * > 1. function 1 : Verify movements synchronization
 * > 2. function 2 : Clear duplicated movements
 * (you can execute all tests with command : 'npm test')
 */


/**
 * Verify strict equality between : sum of scrapped movements, and real balance from bank
 * (see specs in '/tests/is-movements-sync-valid.spec.js') 
 * @param {Array<Movement>} movements - movements from scrapped source
 * @param {Balance} realBalance - real balance form bank
 * @returns {boolean} Return TRUE if sum of scrapped movements === real balance from bank, else return FALSE
 */
export function isMovementsSyncValid(movements, realBalance) {
    let result = 0;
    for (let i = 0; i < movements.length; i++) {
        result += movements[i].amount
    }
    return result === realBalance.balance ? true : false;
}


/**
 * Return an Array  of Movements without duplicated entries
 * (see specs in '/tests/clear-duplicated-movements.spec.js') 
 * @param {Array<Movement>} movements - input movements from scrapped source
 * @returns {Array<Movement>} ouptput movements without duplicated entries
 */
export function clearDuplicatedMovements(movements) {
    const filteredMovements = [];
    for (let i = 0; i < movements.length; i++) {
        if (filteredMovements.indexOf(movements[i]) === -1) {
            filteredMovements.push(movements[i]);
        }
    }
    return filteredMovements;
}


/**
 * Refactorisation of these 2 previous functions to solve the problem
 * Function do 2 actions : 
 * - clear duplicated entries in Array<Movement>
 * - Check if movements synchronization is valid
 * @param {Array<Movement>} movements - input movements from scrapped source
 * @param {Balance} realBalance - real balance form bank
 * @returns {boolean}  -
 */
export function algoFinal(movements, realBalance) {
    const filteredMovements = [];
    let result = 0;
    for (let i = 0; i < movements.length; i++) {
        if (filteredMovements.indexOf(movements[i]) === -1) {
            filteredMovements.push(movements[i]);
            result += movements[i].amount
        }
    }
    return {
        movements: filteredMovements,
        result,
        isSyncValid: result === realBalance.balance ? true : false
    }
}
