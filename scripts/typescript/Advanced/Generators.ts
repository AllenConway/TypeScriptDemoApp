namespace Generators { 
    /**
     * - yields numbers
     * - returns any (or void)
     * - can be passed in numbers
     */
    function *numberCount(num: number): Generator<number, void, number> {
        while (num <= 4) {
            //yield keyword will pause and resume any time asynchronously 
            yield num;
            num++;
        }        
    }

    // generator fucntion returns a Generator object which has a next method
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