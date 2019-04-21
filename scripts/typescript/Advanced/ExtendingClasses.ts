module ExtendingClasses { 

    class Employee {
        private salary: number;
        protected bonus: number;
        doSomething() {
            console.log('You did something!');
        }
    }

    interface Management extends Employee {
        init(): void;
        managerId: number;        
    }

    class Executives extends Employee implements Management {
        init() { 
            // private members are not accessable except from within the class defining it
            // let income = this.salary;
            // protected members are accessible from inside the class and extending classes; works
            this.bonus = 10000;
            this.doSomething();
        }
        managerId = 100;            
    }

    class Staff extends Employee {
        init() { }
    }

    // Error - property 'salary' is missing in Contractor
    // It's only possible for decendants of Employee or the class itself to implement the Managment interface because Employee
    // has a private member that originates in the same declaration which is a requirment for private members to be compatible
    // class Contractor implements Management {
    //     init() { }
    //     managerId = 100;
    //     bonus = 200;
    // }

    let executive = new Executives();
    executive.init();

}