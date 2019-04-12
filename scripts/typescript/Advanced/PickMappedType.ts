namespace PickMappedType { 

    interface Engine {
     cylinders: number;
     blockType: string;
     horsepower: number;
     oilCapacity: number;
     coolantCapacity: number;
     powerSteeringCapacity: number;
     differentialCapcity: number;
     transmissionCapacity: number;
    };

    type EngineFluids = Pick<Engine, 'oilCapacity' | 'coolantCapacity' | 'powerSteeringCapacity'>    

    let cobraEngine: EngineFluids = {
        oilCapacity: 6,
        coolantCapacity: 16,
        powerSteeringCapacity: 2
    }

    type PowertrainFluids = Pick<Engine, 'differentialCapcity' | 'transmissionCapacity' >

    let cobraPowertrain: Partial<PowertrainFluids> = {        
        differentialCapcity: 2,
        transmissionCapacity: 4
    }

}