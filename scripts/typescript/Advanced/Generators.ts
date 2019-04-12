namespace Generators { 

    function *numberCount(num: number): IterableIterator<number> {
        while (num <= 4) {
            yield num++;    
        }        
    }

    // generator funtion returns a Generator object
    let numGenerator = numberCount(1);    
    console.log(numGenerator.next());
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);
    console.log(numGenerator.next().value);

    

}