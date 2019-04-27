export class Hero {
    constructor(
        public name:string
    ) {}
}

export const HEROES = [
    hero('Mr. IQ'),
    hero('Magneta'),
    hero('Bombasto')
];

function hero(name:string):Hero {
    return new Hero(name);
}