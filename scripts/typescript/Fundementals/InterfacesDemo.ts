import { IEngine } from './ModuleDemo';
import { LawnmowerEngine } from "./ModuleDemo";

class CarEngine implements IEngine {

    constructor(public horsepower: number, public cubicInches: number) {
    }

    start() {
        //Insert key into ignition
        //Put foot on brake
        //Start the car!
        alert(`A ${this.horsepower} horsepower engine started started!`);
    }

    stop() {

        //Place car in park or neutral
        //Turn off ignition
        //Pull key out of ignition      
        alert('stopped');
    }
}

window.onload = () => {
    var auto = new CarEngine(320, 289);
    auto.start();
    var mower = new LawnmowerEngine(7.75, 11.6);
    mower.start();
};