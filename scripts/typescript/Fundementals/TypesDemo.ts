
module TypesDemo {

    //Alerts aren't needed because we have compile time checking :D

    //New TS with Type Checking
    let user: string = "Allen";
    console.log(user);

    //1000 lines of TS later :S 

    //Can't assign a number to a string. Will not compile.
    // user = 1234;   

    //Another 1000 lines of TS later
    //This is OK because user is a string and concatenation works
    user = user + ' Conway';
    //This still works. In JS the '+' operator concatenates whenever 
    //one of its operators in not a number. If both are numbers, then addition is done.
    //TypeScript embraces the JavaScript idioms in general
    user = user + 1234;

    // equivalent to above
    let userId: number = 1234;
    user = user + userId;

    //Additional mathematical operations will fail
    //Can't assign a number to a string
    //user = userId * 1;

    //Additional types in TS and type checking

    //dynamic types
    //All assignments work
    let dyno: any;
    dyno = 123;
    dyno = false;
    dyno = "Hello";

    //Boolean
    let isValid: boolean = false;
    //Will not compile
    //isValid = 1234;

    //Array of strings
    let colors: Array<string> = new Array<string>();
    colors.push("red");
    colors.push("blue");
    //Will not compile
    //colors.push(1234);
    //Alternate way to declare:
    let colors2: string[] = ["red", "blue"];
    //colors2.push(1234);


    //Enums
    //TypeScript has quite a bit more concise syntax for enums than it's JS counterpart
    //Note the concise syntax for TypeScript after building an enum
    enum Colors {
        Red,
        Blue,
        Green
    }

    //Notice Intellisense
    let myColor: Colors = Colors.Red;
    //Will not compile
    //myColor = Colors.Yellow;

}