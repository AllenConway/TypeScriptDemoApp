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
    //    The name of the member.
    //    The Property Descriptor for the member.
    function log(target: any, propertKey: string, descriptor: PropertyDescriptor) {
        console.log(`${propertKey} was called`);
    }
    
    //Class Decorator using a decorator factory
    function message(message:string) {
        return function (target: any) {
            console.log(`You said ${message}`);
        };
    }
    
    //Method decorator using a decorator factory
    function adminOnly(id: number) { //factory 
        return function(target: any, propertKey: string, descriptor: PropertyDescriptor) { //decorator
            if (id > 100) {
                console.log(`only admins may access this method`);
            }
        };
    }
    
    function sealed(target: any) {
        Object.seal(target);
        Object.seal(target.prototype);
    }
    
    

}