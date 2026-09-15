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
    // TypeScript matches on shape, not name: without a distinct member these would all be the same type and the overloads couldn't tell them apart
    class Automobile { wheels = 4; }
    class LawnMower { blades = 1; }
    class Motorcycle { handlebars = true; }
    class Moped { pedals = true; }

    interface Engine {        
        start(engineType: Automobile): void;
    }

    interface Engine {
        start(engineType: LawnMower): void;
    }

    interface Engine {
        start(engineType: Motorcycle): void;
        start(engineType: Moped): void;
    }

    // Three declarations produce one Engine with four 'start' overloads
    // Hover each call: the "x of 4" in the tooltip reveals the merged order, since later declarations sort first
    function startVehicles(engine: Engine) {
        engine.start(new Automobile());
        engine.start(new LawnMower());
        engine.start(new Motorcycle());
        engine.start(new Moped());
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
            // Merging adds the type, not the member: nothing assigns transmissionType, so this is undefined at runtime
            let transmission = this.transmissionType;
        }
    }

    // Types can't use Declaration Merging like Interfaces can leverage:
    // This is because types are a unique type entity
    // uncomment to see issue
    // type FullTimeEmployee = {
    //     id: number;
    //     yearsTenure: number,
    // }

    // type FullTimeEmployee = {
    //     managerId: number;
    //     daysPTO: number,
    // }  

    // Interfaces as we've seen can use declaration merging and this will appear as a single interface
    interface FullTimeEmployee {
        id: number;
        yearsTenure: number,
    }

    interface FullTimeEmployee {
        managerId: number;
        daysPTO: number,
    }  

    let fullTimeEmployee: FullTimeEmployee = {
        id: 123,
        yearsTenure: 12,
        managerId: 456,
        daysPTO :25
    }

}

export class DeclarationMergingExternal {} //sample module usage to allow use of "declare global"
declare global{  //Augment the global scope
    interface HTMLElement {
        //Add additional functionality
        myFunction(): void;
        myValue: string; 
    }
}

let htmlElement: HTMLElement;
htmlElement.nodeValue;    // existing interface members are avaliable 
htmlElement.myFunction(); // merged function 
htmlElement.myValue;