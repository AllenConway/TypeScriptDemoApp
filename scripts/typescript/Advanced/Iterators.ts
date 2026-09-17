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
    // for..of walks Unicode code points, so the emoji surrogate pair stays intact.
    let name = 'Allen 👋';
    for (const value of name) {
        console.log(value);
    }

    // Index access walks UTF-16 code units, so the emoji is split into two unusable halves.
    for (let i = 0; i < name.length; i++) {
        console.log(name[i]);
    }

    // Iterate over a map - each value is a [key, value] tuple, so it can be destructured
    const map = new Map([[1, 'north'], [2, 'south'], [3, 'east'], [4, 'west']]);
    for (const [id, direction] of map) {
        console.log(id, direction);
    }

    // Iterate over a Set (unique set of values)
    const set = new Set(['a','b','b','c','d']);
    for (const value of set){
        console.log(value);
    }

    for (const value in set){
        console.log('Will not execute this line, there are no keys to iterate in a set');
    }

    // ES2025 iterator helpers - JavaScript's version of LINQ's deferred execution
    console.log([...set].filter(x => x !== 'a'));         // before: copy into an array just to chain
    console.log(set.values().filter(x => x !== 'a'));     // after: chain straight off the iterator

    class CustomIterable implements Iterable<number> {
        // custom iterator using a defined iterator function implementing the required next() function
        // a fresh closure is created on every call, so the object can be iterated more than once
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
    }

    const customIterable: CustomIterable = new CustomIterable();
    for (const value of customIterable) {
        console.log(value);
    }

    // Same contract as CustomIterable, written as a generator - the * makes TypeScript build the iterator for us
    class CustomIterableGenerator implements Iterable<number> {
        *[Symbol.iterator]() {
            let count = 0;

            while (count < 10) {
                yield count++;
            }
        }
    }

    for (const value of new CustomIterableGenerator()) {
        console.log(value);
    }

    // before: build all 10 values, double all 10, then throw 7 away
    const firstThreeDoubledEager = [...new CustomIterableGenerator()]
        .map(n => n * 2)
        .slice(0, 3);

    console.log(firstThreeDoubledEager); // [0, 2, 4]

    // after: lazy, so take(3) stops the generator after 3 values - the other 7 are never produced
    const firstThreeDoubled = new CustomIterableGenerator()[Symbol.iterator]()
        .map(n => n * 2)
        .take(3)
        .toArray();

    console.log(firstThreeDoubled); // [0, 2, 4]

}