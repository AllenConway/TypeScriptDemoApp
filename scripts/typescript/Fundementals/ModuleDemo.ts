
//Identically named modules are composable and can be extended
//Remember to import module if doing across different files
namespace App {

    export var firstName: string = "Allen";

}

namespace App {

    export var lastName: string = "Conway";

}

var fullName: string = App.firstName + " " + App.lastName;



export interface IEngine {

    

    //Properties
    horsepower: number;
    cubicInches: number;

    //Methods
    start();
    stop();

}

export interface Test {

    cubicInches: string;

}

export class LawnmowerEngine implements IEngine {

    constructor(public horsepower: number, public cubicInches: number) {
    }

    start() {
        //Prime the carburetor
        //Pull the clutch handle
        //Pull the cord
        console.log('A ' + this.horsepower + ' horsepower lawnmower engine started started!');
    }

    stop() {
        //Let go of the clutch handle
        console.log('stopped');
    }
}