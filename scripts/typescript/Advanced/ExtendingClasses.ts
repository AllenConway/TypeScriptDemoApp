module ExtendingClasses { 

    class Employee {
        #salary: number = 200;  // Using newer ECMAScript private notation; either will work
        protected bonus: number;
        doSomething() {
            console.log('You did something!');
            console.log(this.#salary);
        }
    }

    // Includes all the members of Employee including the private salary property
    interface Management extends Employee {
        init(): void;
        managerId: number;        
    }

    class Executives extends Employee implements Management {
        init() { 
            // private members are not accessable except from within the class defining it
            // let income = this.#salary;
            // protected members are accessible from inside the class and extending classes; works
            this.bonus = 10000;
            this.doSomething();            
        }
        managerId = 100;            
    }

    class Staff extends Employee {
        setupStaff() {
            this.bonus = 100;
            this.doSomething();
         }
    }

    // Error - property 'salary' is missing in Contractor
    // It's only possible for decendants of Employee or the class itself to implement the Managment interface because Employee
    // has a private member that originates in the same declaration which is a requirment for private members to be compatible
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