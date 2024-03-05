
// Using legacy TypeScript decorators
// namespace Decorators {

//     @message("Hello from the employee class")
//     @sealed
//     export class Employee {
//         public firstName: string;
//         public lastName: string;

//         @adminOnly(123)
//         @log //careful not to add ()
//         getSalary() {
            
//         }
//     }
    
//     // Method decorator
//     // The expression for the method decorator will be called as a function at runtime, 
//     // with the following three arguments:
//     // target: containing class 
//     // propertKey: the name of the method
//     // descriptor: information that defines a property behavior used to observe, modify, or replace a method definition
//     // This is a plain decorator function using the signature for a method decorator
    // function log(target: any, propertKey: string, descriptor: PropertyDescriptor) {
    //     console.log(`${propertKey} was called`);
    // }
    
//     // Class Decorator using a decorator factory
//     // target: class constructor which can be modified to create an augmented definition
//     function message(message:string): ClassDecorator {
//         return function (target: any) {
//             console.log(`You said ${message}`);
//         };
//     }
    
//     //Method decorator using a decorator factory
//     function adminOnly(id: number): MethodDecorator { //factory 
//         return function<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void { //decorator
//             if (id > 100) {
//                 console.log(`only admins may access this method`);
//             }
//         };
//     }
    
//     // target is the class constructor
//     function sealed(target: any) {
//         // This will seal the constructor and the prototype from 
//         // further functionality being add/removed at runtime
//         Object.seal(target);
//         Object.seal(target.prototype);
//     }
    
// }

namespace ESDecorators {

    @message("Hello from the employee class")
    export class Employee {
        public firstName: string;
        public lastName: string;

        @log //careful not to add ()
        getSalary() {
            return 1000000;
        }
    }

    /**
     * ES Decorator that logs a message when a class is instantiated.
     * 
     * @param msg - The message to be logged.
     * @returns A class decorator.
     */
function message<Input extends new (...args: any) => any>(msg: string) {
    // The returned function is a class decorator.
    // 'value': the constructor of the class being decorated 
    // 'context': provides information about the class being decorated.
    return function (value: Input, context: ClassDecoratorContext) {
        // Check if the decorator is applied to a class.
        if (context.kind === "class") {
            // Return a new class that extends the original class.
            return class extends value {
                // The new class has a constructor that takes any number of arguments.
                constructor(...args) {
                    // Call the constructor of the original class with the provided arguments.
                    super(args);
                    // Log the message when an instance of the class is created.
                    console.log(`You said ${msg}`);
                }
                // The new class has a 'logMessage' method that takes a string 'logMsg' as an argument.
                logMessage(logMsg: string): void {
                    // The 'logMessage' method logs the provided message.
                    console.log(logMsg);
                }
            };
        }
    };
}

      /**
       * Decorator that logs the name of the method when it is called.
       * @param originalMethod - The original method being decorated.
       * @param context - The context of the class method being decorated.
       * @returns The modified method that logs the name and calls the original method.
       */
      function log(originalMethod: any, context: ClassMethodDecoratorContext) {
        // The decorator factory returns a new function 'modifiedMethod' that wraps the original method.
        // 'modifiedMethod' is bound to the same 'this' value as the original method and takes any number of arguments.
        function modifiedMethod(this: any, ...args: any[]) {
            // Log a message every time 'modifiedMethod' is called.
            console.log(`${String(context.name)} was called`);
            // Call the original method with the provided arguments and the correct 'this' value.
            const result = originalMethod.call(this, ...args);
            // Return the result of the original method.
            return result;
        }
        // Return 'modifiedMethod' as the new method.
        return modifiedMethod;
    }

      let employee = new Employee();
      employee.firstName = "Allen";
      const salary = employee.getSalary();

}