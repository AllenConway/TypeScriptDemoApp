namespace ExtendingClasses { 

    class Employee {
        // #private is real runtime privacy; 'private' is erased at compile time. Either one makes this class nominal.
        #salary: number = 200;
        protected bonus = 0;
        doSomething() {
            console.log('You did something!');
            console.log(this.#salary);
        }
    }

    // Inherits Employee's shape AND its #salary member - that member is what limits who can implement this
    interface Management extends Employee {
        init(): void;
        managerId: number;        
    }

    class Executives extends Employee implements Management {
        init() { 
            // private members are not accessible except from within the class defining it
            // let income = this.#salary;
            // protected members are accessible from inside the class and extending classes; works
            this.bonus = 10000;
            this.doSomething();            
        }
        managerId = 100;            
    }

    // Error - property '#salary' is missing in type 'Contractor' but required in type 'Management'
    // It's only possible for descendants of Employee or the class itself to implement the Management interface because Employee
    // has a private member that originates in the same declaration which is a requirement for private members to be compatible
    // If this is made to be a subtype of Employee, then it will work
    // class Contractor implements Management {
    //     doSomething(): void {
    //         console.log('You did something!');
    //     }
    //     init() { }
    //     managerId = 100;
    //     bonus = 200;
    // }

    let executive = new Executives();
    executive.init();

}