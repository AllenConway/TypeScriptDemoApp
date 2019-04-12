namespace IntersectionTypes {

    class Employee {
        getHours(): string {
            return 'retreiving hours';
        }
    }

    class User {
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }

    type Admin = Employee & User;
    let admin: Admin;
    // let myAdmin = new admin;


    function extend<First, Second>(first: First, second: Second): First & Second {
        const result: Partial<First & Second> = {};
        for (const prop in first) {
            if (first.hasOwnProperty(prop)) {
                (<First>result)[prop] = first[prop];
            }
        }
        for (const prop in second) {
            if (second.hasOwnProperty(prop)) {
                (<Second>result)[prop] = second[prop];
            }
        }
        return <First & Second>result;
    }
    
    class Person {
        constructor(public name: string) { }

        test() {

        }
    }
    
    interface Loggable {
        log(name: string): void;
    }
    
    class ConsoleLogger implements Loggable {
        log(name) {
            console.log(`Hello, I'm ${name}.`);
        }

        test1() {

        }
    }
    
    const jim = extend(new Person('Jim'), ConsoleLogger.prototype);
    jim.log(jim.name);

}