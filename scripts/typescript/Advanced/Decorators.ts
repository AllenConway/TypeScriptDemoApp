namespace Decorators {

    @message("Hello from the employee class")
    @sealed
    export class Employee {
        
        @adminOnly(123)
        @log //careful not to add ()
        getSalary() {
            
        }
    
    }
    
    //Method decorator
    //The expression for the method decorator will be called as a function at runtime, with the following three arguments:
    
    //    Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
    //    The name of the method.
    //    The Property Descriptor for the member.
    // This is a plain decorator function using the signature for a method decorator
    function log(target: any, propertKey: string, descriptor: PropertyDescriptor) {
        console.log(`${propertKey} was called`);
    }
    
    //Class Decorator using a decorator factory
    function message(message:string): ClassDecorator {
        return function (target: any) {
            console.log(`You said ${message}`);
        };
    }
    
    //Method decorator using a decorator factory
    function adminOnly(id: number): MethodDecorator { //factory 
        return function<T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): void { //decorator
            if (id > 100) {
                console.log(`only admins may access this method`);
            }
        };
    }
    
    // target is the class constructor
    function sealed(target: any) {
        // This will seal the constructor and the prototype from 
        // further functionality being add/removed at runtime
        Object.seal(target);
        Object.seal(target.prototype);
    }
    
    

}