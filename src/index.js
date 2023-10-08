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
    return result === realBalance.balance ? true : false;
}


/**
 * Return an Array of Movements without duplicated entries
 * (see specs in '/tests/clear-duplicated-movements.spec.js') 
 * 
 * @param {Array<Movement>} movements - movements from scrapped source
 * @returns {Array<Movement>} Movements without duplicated entries
 */
export function clearDuplicatedMovements(movements) {

    let filteredMovements = movements.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id && item.date === current.date &&
            item.wording === current.wording && item.amount === current.amount);
        return (!x) ? acc.concat([current]) : acc;
    }, []);

    // let filteredMovements = [];
    // for (let obj of movements) {
    //     if (filteredMovements.find((el) => {
    //         el.id === obj.id && el.date === obj.date &&
    //             el.wording === obj.wording && el.amount === obj.amount
    //     }) === undefined) {
    //         filteredMovements.push(obj)
    //     }
    // }

    // const filteredMovements = Array.from(new Set(movements.map(a => a.id))).map(id => {
    //     return movements.find(a => a.id === id)
    //  })

    // let filteredMovements = [];
    // for (let i=0; i< movements.length; i++) {
    //     if (filteredMovements.find((el) => {
    //         el.id === movements[i].id &&
    //         el.date === movements[i].date &&
    //         el.wording === movements[i].wording &&
    //         el.amount === movements[i].amount
    //     }) === undefined) {
    //         filteredMovements.push(movements[i])
    //     }
    // }

    return filteredMovements

}