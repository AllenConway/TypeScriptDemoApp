module ES6 {    

    export class EcmaScriptTests {

        public outputTest(): void {

            //var myValue;

            //The let statement declares a block scope local variable, optionally initializing it to a value
            let myValue;

        }

        public spreadOperatorTest() {

            //The spread operator Allows parts of an array literal to be 
            //initialized from an iterable expression (such as another array 
            //literal), or allows an expression to be expanded to multiple 
            //arguments(in function calls).

            var a, b, c, d, e;
            a = [1, 2, 3];
            b = "dog";
            c = [42, "cat"];

            // Using the concat method.
            d = a.concat(b, c);

            // Using the spread operator.
            e = [...a, b, ...c];

            console.log(d);
            console.log(e);

            //Output:
            //1, 2, 3, "dog", 42, "cat"
            //1, 2, 3, "dog", 42, "cat"

        }

        public forOfLoopTest() {

            let people = [
                {
                    name: "Allen",
                    lastName: "Conway"
                },
                {
                    name: "Joe",
                    lastName: "Smith"
                }];

            for (var p of people) {
                console.log(p.name);
            }

        }

    }

} 