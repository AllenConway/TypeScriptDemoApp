namespace ExtractConditionalTypes {

    // simple union type using primitives
    type T00 = Extract<"a" | "b" | "c" | "d", "a" | "c" | "f">;  //type T00 = "a" | "c"
    type T01 = Extract<1 | 2 | 3 | 4, 2 | 4 | 9>; //type T01 = 2 | 4

    type User = {
        id: number;
        firstName: string;
        lastName: string;
        phone: number | string;
        address: string;
        state: string;
        zip: number | string;
    };

    // Leverage 'Extract' and key of T to map a new type
    type UserAddress = { [k in Extract<keyof User, 'id' | 'address' | 'state' | 'zip'>]: User[k] };
    let userAddress: UserAddress = {
        id: 123,
        address: "123 Oak St.",
        state: "LA", 
        zip: "70113"
    }

    console.log(Object.keys(userAddress));
    console.log(JSON.stringify(userAddress));

    
    // Helper type defined that will create a new Type leveraging Extract, key of T, and Pick
    type Include<T, K extends keyof T> = Pick<T, Extract<keyof T, K>>;

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

    type EngineMeta = Include<Engine, "cylinders" | "blockType" | "horsepower">;
    let myEngineMeta: EngineMeta = {
        cylinders: 8,
        blockType: "Aluminum",
        horsepower: 500
    }
    console.log(Object.keys(myEngineMeta));
    console.log(JSON.stringify(myEngineMeta));

    
    //No need for Include helper type above to be created, can use Pick directly for the same result    
    type EngineInfo = Pick<Engine, "cylinders" | "blockType" | "horsepower">;
    let myEngineInfo: EngineMeta = {
        cylinders: 6,
        blockType: "Iron",
        horsepower: 350
    }
    console.log(Object.keys(myEngineInfo));
    console.log(JSON.stringify(myEngineInfo));

}