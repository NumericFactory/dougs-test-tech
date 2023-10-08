# dougs-test-tech-se

## Candidat
- <a href="https://www.linkedin.com/in/flossignol" target="_blank">Frederic Lossignol</a>

> [!WARNING]
> Le test technique contient 2 Repo 
> *  **Définir, tester, et refactoriser l'algorithme** (repo 1 - celui-ci)
> * **<a href="https://github.com/NumericFactory/dougs-test-tech/blob/main/src/tests/is-movements-sync-valid.spec.js" target="_blank">Implémenter la solution sur le back-end (Nest.js) et le front-end (Angular)</a>** (repo 2)

Pour ce test technique, j'ai organisé mon travail en 3 parties.

# Sommaire
1. Définir, tester, et refactoriser l'algorithme
2. Implémenter et tester la solution sur le back-end (Nest.js)
3. Créer le front end (Angular)



## 1. Définir et tester les algorithmes

> [!NOTE]
> Environnement: Node.js | Test: Jest | ES6Module Babel: pour les import/export

> [!IMPORTANT]
> **INSTRUCTIONS POUR LES EXAMINATEURS**
> - Récupérer le repo en local: `git clone https://github.com/NumericFactory/dougs-test-tech.git`
> - Installer les dépendances : `npm install`
> - Lancer les tests: `npm test`

Première approche : créer 2 algorithmes simples en mode TDD (Test Driven Development), puis je teste leur performance en terme de rapidité avant de procéder à une refactorisation.

- **isMovementsSyncValid()** sera chargée de valider si la synchronisation bancaire est un succès ou non
- **clearDuplicatedMovements()** sera chargée d'éliminer les doublons

### Les tests pour **isMovementsSyncValid()**
Je définis une suite de tests pour la function **isMovementsSyncValid()**

<a href="https://github.com/NumericFactory/dougs-test-tech/blob/main/src/tests/is-movements-sync-valid.spec.js" target="_blank">src/tests/is-movements-sync-valid.spec.js</a>
```
/**
* test 1: SUCCES DE LA SYNCHRONISATION BANCAIRE
*          return true, si l'addition du montant de chaque opération === realBalanceFromBank
*          La syncrhonisation des opérations ne comporte pas d'erreurs
*/
it('Should return true if sum of movements === RealBankBalance', () => {
        expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(true)
})

```

```
/**
* test 2: LE CAS DU DOUBLON
*          return false, si une opération est dupliquée dans la liste des opérations
*          (l'addition du montant de chaque opération != realBalanceFromBank)
*/
it('Should return false if movements have a duplicated entry', () => {
    // we add fake duplicated entry
    movements = [...movements, movements[3]];
    expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(false);
});

```

```
/**
* test 3: LE CAS DU MANQUANT 
*          return false, si une opération est manquante dans la liste des opérations
*          (l'addition du montant de chaque opération != realBalanceFromBank)
*/
it('Should return false if movements have a missing entry', () => {
    // we delete an entry (ex: movement.id:4)
    movements = movements.filter(mov => mov.id != 4);
    expect(isMovementsSyncValid(movements, realBalanceFromBank)).toBe(false);
});
```

### Créer la fonction **isMovementsSyncValid(movements, realBalance)** et lancer les tests

<a href="https://github.com/NumericFactory/dougs-test-tech/blob/main/src/index.js" target="_blank">src/index.js</a>

```
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
```

### Lancer les tests
J'ai préalablement installé JEST et j'ai configuré dans package.json la commande test

```
"scripts": {
    "test": "jest --verbose",
},
```

Je lance les tests : `npm test`

**Résultats**

![Test is movements sync valid](https://github.com/NumericFactory/dougs-test-tech/blob/main/img/is-movements-sync-valid-spec-test.png?raw=true)


### Examples d'utilisation de la fonction **isMovementsSyncValid(movements, realBalance)**

```
isMovementsSyncValid([
     { id: 1, date: new Date('2023-10-06 15:30:00'), wording: 'Achat boulanger', amount: -100 },
     { id: 4, date: new Date('2023-10-04 21:09:00'), wording: 'Facture client F021234', amount: 300 }
 ], 
 200)
 //=> true
```

```
isMovementsSyncValid([
     { id: 1, date: new Date('2023-10-06 15:30:00'), wording: 'Achat boulanger', amount: -100 },
     { id: 4, date: new Date('2023-10-04 21:09:00'), wording: 'Facture client F021234', amount: 100 }
 ], 
 50)

 //=> false
 ```
