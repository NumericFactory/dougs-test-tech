/**
 * @Author : Frederic LOSSIGNOL
 * CREATE ALGORITHM(S) TO SOLVE 2 PROBLEMS
 * > 1. function 1 : Verify movements synchronization
 * > 2. function 2 : Clear duplicated movements
 * 
 * you can execute all tests with command : 'npm test'
 */


/**
 * Verify strict equality between : sum of scrapped movements, and real balance from bank
 * (see specs in '/tests/is-movements-sync-valid.spec.js') 
 * 
 * @param {Array<Movement>} movements - movements from scrapped source
 * @param {Balance} realBalance - real balance form bank
 * @returns {boolean} Return TRUE if sum of scrapped movements === real balance from bank, else return FALSE
 */
export function isMovementsSyncValid(movements, realBalance) {
    let result = 0;
    for (let mouv of movements) {
        result += mouv.amount
    }
    return result == realBalance.balance ? true : false;
}
