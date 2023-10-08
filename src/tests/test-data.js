let realBalanceFromBank = {
    date: new Date('2023-10-31'),
    balance: 601.5
};
let movements = [
    { id: 1, date: new Date('2023-10-04 21:09:00'), wording: 'Facture EDF', amount: -150.50 },
    { id: 2, date: new Date('2023-10-05 17:57:00'), wording: 'Achat CDiscount', amount: -359 },
    { id: 3, date: new Date('2023-10-06 15:30:00'), wording: 'Achat boulanger', amount: -119 },
    { id: 4, date: new Date('2023-10-04 21:09:00'), wording: 'Facture client F021234', amount: 1230 }
];

export let fakeData = {
    realBalanceFromBank,
    movements
}