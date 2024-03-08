namespace MixinsUsingApply {

    // using placeholders on an anemic class method

    class Employee {
        getHours(): string {
            return 'retrieving hours';
        }
    }

    class User {
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }

    class Management {
        getSalary(): string {
            return 'retrieving slary';
        }
    }

    // Sample base class
    export class Administrator {

    }
    export interface Administrator extends Management, User, Employee {}

    // Another way, but more laboroius
    // export class Administrator implements Employee, User, Management {
    //     // Note! when run these messages are not seen or executed
    //     getHours(): string {
    //         throw new Error("Method not implemented.");
    //     }        
    //     getLastLogin(): string {
    //         throw new Error("Method not implemented.");
    //     }
    //     getSalary(): string {
    //         throw new Error("Method not implemented.");
    //     }
    // }
    
    // Ideally this would be in a static class elsewhere
    function applyMixins(derivedCtor: any, baseCtors: any[]) {
        baseCtors.forEach(baseCtor => {
            Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
                derivedCtor.prototype[name] = baseCtor.prototype[name];
            });
        });
    }

    // Pass in Administrator mixin class plus array of individual classes to generate new mixin version of Administrator
    applyMixins(Administrator, [Employee, Management, User]);

    const admin = new Administrator();
    console.log(admin.getHours());
    console.log(admin.getSalary());
    console.log(admin.getLastLogin());
}

namespace MixinUsedElsewhere {

    // Notice how I don't need to call applyMixin again, and can create an instance of Administrator
    // If you remove the call to applyMixin above, this will fail, as no mixin has been created
    const administrator = new MixinsUsingApply.Administrator();
    console.log(administrator.getHours());
    console.log(administrator.getSalary());
    console.log(administrator.getLastLogin());

}

namespace MixinsUsingComposer {
    
    // using a function that extends with new functionality
    // The only thing I don't like about this method is having to shape functions ahead of time to be composable mixins
    
    // Utility composer from TypeScript Deep Dive
    // represents constructor of T taking any (rest) parameters
    type mixinComposer<T = {}> = new (...args: any[]) => T;

    // Each mixin function must do the following:
    // take a constructor,
    // create a class that extends that constructor with new functionality
    // return the new class that is a mixin of both classes

    function Employee<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getHours(): string {
                return 'retrieving hours';
            }
        }
    }

    function User<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getLastLogin(): string {
                return `Last Login: ${Date.now()}`;
            }
        }
    }

    function Management<TBase extends mixinComposer>(Base: TBase) {
        return class extends Base {
            getSalary(): string {
                return 'retrieving salary';
            }
        }
    }

    export class Administrator {   
        constructor(public empId: number) {}     
    }

    export const Admin = Employee(User(Management(Administrator)));
    const admin = new Admin(123);
    console.log(admin.getHours());
    console.log(admin.getSalary());
    console.log(admin.getLastLogin());

}

namespace PlainOldJavaScriptMixin {

    class Employee {
        id; string;
        constructor() {
            this.id = 99;
        }
        
        getHours() {
            return 'retrieving hours';
        }
    }

    class User {
        name: string = 'Allen';
        getLastLogin() {
            return `Last Login: ${Date.now()}`;
        }
    }

    class Management {
        department: number = 100;
        getSalary() {
            return 'retrieving salary';
        }
    }
    // There is an issues with Object.assign here if trying to use for JavaScript mixins:
    // 1. Using object.assign for the 'JavaScript way' to create a mixin is ideal for mixing 1 single class
    // and object literals together. It does not work correctly though for multiple classes with methods on each class.
    // The reason is Object.assign only does a shallow copy, so methods on the source prototypes (1..n other source classes) 
    // are not copied (methods on a class are not enumerable) and Object.assign() only copies properties that are enumerable 
    // and not inherited resulting in an error that getLastLogin and getHours are not defined.
    Object.assign(Management.prototype, User.prototype, Employee.prototype);

    /**
     * Helper function for applying mixins to a 1..n JavaScript classes.
     * 
     * @param target - The target class to apply the mixins to.
     * @param sources - The mixin classes to apply.
     * @returns The target class with the mixins applied.
     */
    function jsClassMixinHelper(target, ...sources) {
        sources.forEach(source => {
            const {name,length,prototype,...statics} = Object.getOwnPropertyDescriptors(source);
            Object.defineProperties(target, statics);
            const {constructor,...proto} = Object.getOwnPropertyDescriptors(source.prototype);
            Object.defineProperties(target.prototype, proto);
        });
    
        return target;
    }

    jsClassMixinHelper(Management, User, Employee);

    // Note: The TS compiler is not able to see the getLastLogin or getHours methods on the Management mixin because the methods 
    // are added at runtime using jsClassMixinHelper() (or Object.assign), but TypeScript's static type checking happens at compile time. 
    // Therefore an error will be thrown at compile time but will work at runtime, so those 2 lines must remain commented.
    // You can run quokka.js against the transpiled JavaScript to see the valid output.
    const management = new Management();
    console.log(management.getSalary());
    // console.log(management.getLastLogin());
    // console.log(management.getHours());
}