namespace Generators { 
    /**
     * Generator<T, TReturn, TNext>
     *   number - the type produced by each yield
     *   void   - the type returned when the generator finishes (this one has no return statement)
     *   number - the type accepted as an argument to .next()
     */
    function *numberCount(num: number): Generator<number, void, number> {
        while (num <= 4) {
            // Pause here and produce num.
            // Resume when next() is called again.
            yield num;
            num++;
        }        
    }

    // Calling the generator function returns
    // a Generator object, but runs no code yet.
    let numGenerator = numberCount(0);    
    // Each call to the next() method performs another pass through the iterative algorithm
    // Each step's value is the value specified by the yield keyword
    // .next() Returns a value yielded by the yield expression
    console.log(numGenerator.next());
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().done);

    // That third type parameter is real, not decoration - TypeScript enforces what .next() will accept
    // Error TS2345: Argument of type '["5"]' is not assignable to parameter of type '[] | [number]'
    // numGenerator.next('5');

    // Pausing is not async and blocks nothing: on yield the function's frame leaves the call stack and
    // its state becomes a plain heap object, so only the .next() call itself ever uses the thread.

}