
enum Engines {
    Automobile,
    LawnMower,
    Motorcycle,
    Moped
}

class OverLoadingMethods {
    // strictly for intellisense
    start(engineType: Engines.Automobile, vin: string): void;
    start(engineType: Engines.Automobile, name: string): void;
    start(engineType: Engines.LawnMower, oilCapacity: number): void;
    start(engineType: Engines.Motorcycle, isVtwin: boolean): void;
    start(engineType: Engines.Moped, manufactureDate: Date): void;
    start(engineType: Engines, metaData: string | number | boolean | Date): void {
        // 1. Use type guard (or custom type guard), switch, etc. determine engine type
        switch(engineType) { 
            case Engines.Automobile: { 
               // logic for an automobile
               break; 
            } 
            case Engines.LawnMower: { 
               // logic for an lawnmower
               break; 
            } 
            default: { 
               // default logic 
               break; 
            } 
         }
        // 2. Check to see _which_ additional variable is defined based on type i.e.:
        if (typeof metaData === 'string'){
            const vin = metaData;
        }
    };

    init() {
        this.start(Engines.Automobile, '1VKAESCAS4232202W');
    }

}