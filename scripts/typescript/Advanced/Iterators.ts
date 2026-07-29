namespace Iterators {

    interface Person {
        id: number;
        name: string;
    }

    let people: Person[] = [{
        id: 1,
        name: 'John'
    }, {
        id: 2,
        name: 'Sally'
    }];

    // for..of loops over values in an iterable object using the iterator protocol
    for (const person of people) {
        console.log(person);
    }

    // for..in loops enumerates property keys of an object, but does not iterate over the values of an iterable object
    for (const key in people) {
        console.log(key);
    }

    // Strings are built-in iterables.
    // Iteration returns Unicode code points.
    let name = 'Allen';
    for (const value of name) {
        console.log(value);
    }

    // Iterate over a map
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

    class CustomIterable implements Iterable<number> {
        // custom iterator using a defined iterator function implmenting the required next() function
        [Symbol.iterator](): Iterator<number> {
            let count = 0;

            return {
                next(): IteratorResult<number> {
                    return count < 10
                        ? { done: false, value: count++ }
                        : { done: true, value: undefined };
                }
            };
        }

        // custom iterator using a generator function denoted by the * before the function name. 
        // This function does not explicitly return an iterator object with a next method. Instead, 
        // it implicitly creates one because it's a generator function
        // *[Symbol.iterator](): IterableIterator<number> {
        //     let count = 0;

        //     while (count < 10) {
        //         yield count++;
        //     }
        // }
    }

    const customIterator: CustomIterable = new CustomIterable ();
    for (const value of customIterator) {
        console.log(value);
    }

}