// @message("Hello from the employee class")
// @sealed
// export class Employee {

//     public firstName:string;
//     public lastName:string;
    
//     @adminOnly(123)
//     @log //careful not to add ()
//     getSalary() {
        
//     }

// }

// //Method decorator
// //The expression for the method decorator will be called as a function at runtime, with the following three arguments:

// //    target: Either the constructor function of the class for a static member, or the prototype of the class for an instance member.
// //    propertKey: The name of the member.
// //    descriptor: The Property Descriptor for the member. (i.e. Object.getOwnPropertyDescriptor(Employee.prototype, propertyKey)
// function log(target: any, propertKey: string, descriptor: PropertyDescriptor) {    
//     console.log(`${propertKey} was called`);
// }

// //Class Decorator using a decorator factory
// function message(message:string) {
//     return function (target: any) {
//         console.log(`You said ${message}`);
//     };
// }

// //Method decorator using a decorator factory
// function adminOnly(id: number) { //decorator factory 
//     return function(target: any, propertKey: string, descriptor: PropertyDescriptor) { //decorator
//         if (id > 100) {
//             console.log(`only admins may access this method`);
//         }
//     };
// }

// // Prevents the modification of attributes of existing properties, and prevents the addition of new properties.
// function sealed(target: any) {
//     //target: current object’s prototype i.e — Since employee is an object it will be, Employee.prototype
//     console.log(target);
//     Object.seal(target);
//     Object.seal(target.prototype);
// }

