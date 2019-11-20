namespace ExcludeConditionalTypes {

    // simple union type using primitives
    type T00 = Exclude<"a" | "b" | "c" | "d", "c">;  //type T00 = "a" | "b" | "d"
    type T01 = Exclude<1 | 2 | 3 | 4, 2>; //type T01 = 1 | 3 | 4

    type User = {
        id: number;
        firstName: string;
        lastName: string;
        phone: number | string;
        address1: string;
        address2: string;
        state: string;
        zip: number | string;
    };

    // Leverage 'Exclude' and key of T to map a new type
    type BasicUser = { [k in Exclude<keyof User, 'address1' | 'address2' | 'state' | 'zip'>]: User[k] };
    let basicUser: BasicUser = {
        id: 1000,
        firstName: "Susan",
        lastName: "Smith",
        phone: "504-555-5555"
    }

    console.log(Object.keys(basicUser));
    console.log(JSON.stringify(basicUser));

    
    // Helper type defined that will create a new Type leveraging Exclude, key of T, and Pick
    // Omit was excluded from the TS library which we trivially created as Pick<T, Exclude<keyof T, K>> (returned in v3.5)
    // type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

    type Engine = {
        cylinders: number;
        blockType: string;
        horsepower: number;
        oilCapacity: number;
        coolantCapacity: number;
        powerSteeringCapacity: number;
        differentialCapcity: number;
        transmissionCapacity: number;
    };

    type EngineFluidCapcity = Omit<Engine, "cylinders" | "blockType" | "horsepower">;
    let myEngine: EngineFluidCapcity = {
        oilCapacity: 5,
        coolantCapacity: 8,
        powerSteeringCapacity: .5,
        differentialCapcity: 3.4,
        transmissionCapacity: 12
    }
    console.log(Object.keys(myEngine));
    console.log(JSON.stringify(myEngine));
    
}