//note: becomes a IIFE when transpiled to JS targeting ES5
class FunctionsDemo {

    //This class method will end up being placed on the prototype of the object
    formatName(firstName: string, lastName: string, middleName?: string):string {

        //use ES6 template literals formatting
        //return `${firstName} ${middleName} ${lastName}`;
        return middleName ? `${firstName} ${middleName} ${lastName}`: `${firstName} ${lastName}`; //use a ternary operator
    }

    formatNumber = (phone:string) => {
        return phone.replace(/(\d{3})(\d{3})(\d{4})/,"($1) $2-$3");
    }

    //static class methods are assigned to the constructor function
    static convertToUpperCase(valueToConvert) {
        return valueToConvert.toUpperCase();
    }    

    getClassAttendees(...classList: string[]){ 
        return classList.join(", ");   
           
    }

    myMethod = () => {
    }

}

let functionsDemo: FunctionsDemo = new FunctionsDemo();
let fullName = functionsDemo.formatName('Allen', 'Conway', 'Thomas');
console.log(fullName);
let shortName = functionsDemo.formatName('Allen', 'Conway');  //works as optional parameters are
console.log(shortName);
let phone = functionsDemo.formatNumber('8882995555');
console.log(phone);
let firstName = FunctionsDemo.convertToUpperCase('allen');
console.log(firstName);
let classList = functionsDemo.getClassAttendees("Ben", "John", "Jennifer", "Nate");
console.log(classList);