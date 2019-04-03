namespace Symbols {
 
    // The symbol constructor can take nothing, string, or a number which is used for debugging purposes only
    const sym1 = Symbol("test");
    const sym2 = Symbol("test 2");

    console.log(sym1);
    console.log(sym2);
    // Getting feedback already because Symbols are unique by defintion so this is always 'false'
    // console.log(sym1 === sym2);    

    //Symbols can be used as keys for object properties
    const firstName = Symbol('firstName');    
    const sessionName = Symbol('sessionName');

    interface Person {
        [firstName]: string; // symbol which is guarenteed to be uniqu and avoid collision
        firstName: string; // literal with identical name
        lastName: string
        [sessionName]: string;
    }

    let person: Person = {        
        [firstName]: "Allen",
        firstName: "Allen",
        lastName: "Conway",
        [sessionName]: "TypeScript: Moving Beyond the Basics"
    }

    //Symbols can't be iterated over
    console.log(Object.keys(person));

    //Symbols can still be seen through reflection so they aren't _truly_ private
    console.log(Object.getOwnPropertySymbols(person));

}