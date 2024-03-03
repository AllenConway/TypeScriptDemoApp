
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
//     function log(target: any, propertKey: string, descriptor: PropertyDescriptor) {
//         console.log(`${propertKey} was called`);
//     }
    
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

        // @adminOnly(123)
        // @log //careful not to add ()
        // getSalary() {
            
        // }
    }

    /**
     * ES Decorator that logs a message when a class is instantiated.
     * 
     * @param msg - The message to be logged.
     * @returns A class decorator.
     */
    function message<Input extends new (...args: any) => any>(msg: string) {
        return function (value: Input, context: ClassDecoratorContext) {
          if (context.kind === "class") {
            return class extends value {
              constructor(...args) {
                super(args);
                console.log(`You said ${msg}`);
              }
              logMessage(logMsg: string): void {
                console.log(logMsg);
              }
            };
          }
        };
      }

      let employee = new Employee();
      employee.firstName = "Allen";
      employee['logMessage'](`Hello ${employee.firstName}!`);

    // function message<Input extends new (...args: any) => any>(
    //     value: Input,
    //     context: ClassDecoratorContext
    // ) {
    //     if (context.kind === "class") {
    //         return class extends value {
    //             constructor(...args) {
    //                 super(args);
    //                 console.log(`You said ${message}`);
    //             }
    //         };
    //     }
    // }

    // Class Decorator using a decorator factory
    // target: class constructor which can be modified to create an augmented definition
    // function message(message:string): ClassDecorator {
    //     return function (target: any) {
    //         console.log(`You said ${message}`);
    //     };
    // }

}