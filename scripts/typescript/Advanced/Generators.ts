namespace Generators { 
    /**
     * - yields numbers (type checked)
     * - function returns void; no return statement (or any could be used)
     * - can be passed in numbers (via .next(); type checked)
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
    

}