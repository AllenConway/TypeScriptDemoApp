namespace DeclarationMerging {

    // ***Interface merging with members***
    interface Car {
        weight: number;
        horsepower: number;
        color: string;
        isManualTransmission: boolean;
    }

    interface Car {
        year: number;
        make: string;
        model: string;
    }

    // Notice intellisense will provide all fields, and only show the ones not yet defined
    // The 'Car' Interface will be merged as a single Interface
    let mustang: Car = {
        color: "black",
        horsepower: 540,
        isManualTransmission: true,
        make: "Ford",
        model: "Shelby GT500KR",
        weight: 3260,
        year: 2009
    }

    console.log(`Here is the car data: ${JSON.stringify(mustang)}`);

    // ***Interface merging with functions on Interfaces***
    class Automobile { }
    class LawnMower { }
    class Motorcycle { }
    class Moped { }
    
    interface Engine {        
        start(engineType: Automobile);
    }

    interface Engine {
        start(engineType: LawnMower);
    }

    interface Engine {
        start(engineType: Motorcycle);
        start(engineType: Moped);
    }

    class OperateEngines implements Engine {

        // These are only added for example and not needed; the single implementation is below
        // start(engineType: Automobile);        
        // start(engineType: LawnMower);
        // start(engineType: Motorcycle);
        // start(engineType: Moped) {};

        // Even though we merged the interface declaration and have overloaded signatures, there will only be one implementation selected
        // This is because the transpiled JS doesn't have types to differentiate, so the overloads are shown only at time of development
        // Take a peek at the JS to see the implementation
        start(engineType: Automobile) {
            // put the key in the ignition
            // push on the clutch
            // turn the ignition...
        }      
        
        // Note: in transpiled JS, /** @class */ is emitted so minifiers can remove unused classes

    }

    //*** Example of merging an Interface and a class***
    enum TransmissionType {
        Manual,
        Automatic
    }

    enum EngineCylinder {
        FourCylinder,
        SixCylinder,
        EightCylinder

    }

    interface MechanicalSystems {
        transmissionType: TransmissionType;
        engineCylinder: EngineCylinder;
        isAWD: boolean;
    }

    class MechanicalSystems {
        checkSystems(){
            // this is valid as the class and interface are in the same namespace/module and are merged into a single type
            let transmission = this.transmissionType;
        }
    }

}

export class DeclarationMergingExternal {} //sample module usage to allow use of "declare global"
declare global{  //Augment the global scope
    interface HTMLElement {
        //Add additional functionality
        myFunction();
        myValue: string; 
    }
}

let htmlElement: HTMLElement;
htmlElement.nodeValue;    // existing interface members are avaliable 
htmlElement.myFunction(); // merged function 
htmlElement.myValue;