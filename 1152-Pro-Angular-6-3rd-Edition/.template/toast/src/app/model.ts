export class Model {
    constructor(public user:string, public items:ToDoItem[] ) {
    }
}
export class ToDoItem {
    constructor(public action:string, public done:boolean) {
    }
}

export function dummyModel():Model {
    const item = (action:string, done:boolean):ToDoItem => new ToDoItem(action, done);
    
    return new Model('Adem Dynamic', [
        item('Buy Flowers', false),
        item('Get Shoes', false),
        item('Collect tickets', true),
        item('Call Joe', false)           
    ]) ;
}