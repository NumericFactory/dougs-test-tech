export function clearDuplicatedMovements(movements) {

    let filteredMovements = movements.reduce((acc, current) => {
        const x = acc.find(item => item.date === current.date && item.wording === current.wording && item.amount === current.amount);
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