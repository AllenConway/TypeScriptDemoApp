namespace Iterators {

    let people = [{
        id: 1,
        name: 'John'
    }, {
        id: 2,
        name: 'Sally'
    }];

    // for..of loops over values in an iterable object
    for (const person of people) {
        console.log(person);
    }

    // for..in loops over keys in an iterable object
    for (const person in people) {
        console.log(person);
    }

    // primative values can be iterable as values are coerced to objects 
    // before the iterator method (Symbol.Iterator) is accessed; iterate over unicode code points/single characters
    let name = 'Allen';
    for (const value of name) {
        console.log(value);
    }

    // Iterate over a map
    // make sure to set 'downlevelIteration:true' for ES5 full support
    const map = new Map([[1, 'north'], [2, 'south'], [3, 'east'], [4, 'west']]);
    for (const kvpair of map) {
        console.log(kvpair);
    }

    // Iterate over a Set (unique set of values)
    const set = new Set(['a','b','b','c','d']);
    for (const value of set){
        console.log(value);
    }

    for (const value in set){
        console.log('Will not execute this line, there are no keys to iterate in a set');
    }

}