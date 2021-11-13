import { Engine, LawnmowerEngine } from './ModuleDemo';

interface CoolEngine {
    cylinders: number,
    horsepower: number
}

class CarEngine implements Engine {

    constructor(public horsepower: number, public cubicInches: number, public coolEngine:CoolEngine) {
    }

    start() {
        //Insert key into ignition
        //Put foot on brake
        //Start the car!
        console.log(`A ${this.horsepower} horsepower engine started started!`);
    }

    stop() {

        //Place car in park or neutral
        //Turn off ignition
        //Pull key out of ignition      
        console.log('stopped');
    }
}

let myEngine:CoolEngine = {
    cylinders:8,
    horsepower:500
}

var auto = new CarEngine(320, 289, myEngine);
auto.start();
var mower = new LawnmowerEngine(7.75, 11.6);
mower.start();