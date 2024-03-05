namespace AsyncAwait {

    interface Car {
        year: number;
        make: string;
        model: string;
    }

    interface Driver {
        firstName: string,
        lastName: string
    }

    function getCars(): Promise<Car[]> {
        let cars: Car[] = [
            { year: 2001, make: "Ford", model: "Mustang COBRA SVT" },
            { year: 2014, make: "Ford", model: "Mustang Shelby GT500" },
            { year: 2015, make: "Dodge", model: "Challenger R/T" },
            { year: 2015, make: "Chevy", model: "Corvette Z06" },
            { year: 2015, make: "Ford", model: "Camaro ZL1" }
        ];
        return new Promise<Car[]>(resolve => {
            setTimeout(() => {
                resolve(cars);
            }, 4000);
        });
    }    

    function getDrivers(): Promise<Driver[]> {
        let drivers: Driver[] = [
            { firstName: "Allen", lastName: "Conway" },
            { firstName: "Jenn", lastName: "Smith" },
            { firstName: "John", lastName: "Davis" }
        ];
        return new Promise<Driver[]>(resolve => {
            setTimeout(() => {
                resolve(drivers);
            }, 4000);
        });
    }   

    async function listCars(): Promise<void> {

        console.log('Getting cars...');

        // The await keyword pauses execution of the async function until the promise is resolved
        let allCars:Car[] = await getCars();
        // await expression ^^ evaluates to the result value of the promise, 
        // then the execution of the async function resumes below
        console.log(`Retrieved cars: ${JSON.stringify(allCars)}`);

    }

    async function listDrivers(): Promise<void> {

        console.log('Getting drivers...');

        // The await keyword pauses execution of the async function until the promise is resolved
        let allDrivers:Driver[] = await getDrivers();
        // await expression ^^ evaluates to the result value of the promise, 
        // then the execution of the async function resumes below
        console.log(`Retrieved drivers: ${JSON.stringify(allDrivers)}`);

    }

    async function getCarsandDrivers(): Promise<string> {

        console.log('Getting cars and drivers...');
        await getCars();
        await getDrivers();

        //note returned value directly as opposed to wrapping in a new Promise using async functions
        return "All async complete";
    }


    // Sample #1:
    listCars();    
    console.log('continuing execution...');
    // Sample #2:
    listDrivers();    
    console.log('continuing execution...');
    // Sample #3 using multiple await calls:
    getCarsandDrivers().then(result => console.log(result));

}