namespace IntersectionTypes {

    interface Employee {
        getHours(): string;
    }

    interface User {
        getLastLogin(): string;
    }

    type Admin = Employee & User;
    let admin: Admin = {
        getHours(): string {
            return 'retreiving hours';
        },
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }; 
    console.log(admin.getHours());
    console.log(admin.getLastLogin());

    // Use helper extend with intersection types on 2 classes below to create a new type
    class PersonClass implements Employee {
        getHours(): string {
            return 'retreiving hours';
        }
    }

    class UserClass implements User {
        getLastLogin(): string {
            return `Last Login: ${Date.now()}`;
        }
    }

    // Utility method that uses '&' intersection type combining multiple types into one
    function extend<First, Second>(first: First, second: Second): First & Second {
        // Note: the returned object is a brand new instance not the original prototype
        // None of the changes are reflected on the original class prototype
        // Just a returned single use instance for specific needs within a given scope
        const result: Partial<First & Second> = {};
        for (const prop in first) {
            if (first.hasOwnProperty(prop)) {
                (<First>result)[prop] = first[prop];
            }
        }
        for (const prop in second) {
            if (second.hasOwnProperty(prop)) {
                (<Second>result)[prop] = second[prop];
            }
        }
        return <First & Second>result;
    }

    const adminUser = extend(PersonClass.prototype, UserClass.prototype);    
    console.log(adminUser.getHours());
    console.log(adminUser.getLastLogin());

}

namespace UnionTypes {

    function allowUnionTypeParameter(input: string|number|null) {
        return input;
    }

    console.log(allowUnionTypeParameter(123));
    console.log(allowUnionTypeParameter("Hello"));
    console.log(allowUnionTypeParameter(null));
    // Lines below are not allowed    
    //  console.log(allowUnionTypeParameter(true));
    //  console.log(allowUnionTypeParameter(undefined));

    export interface Engine {
        manufacturer: string;
        size: number;
        horsePower: number;
        showEngineMeta();
    }

    export interface Car {
        color: string;
        model: string;
        manufacturer: string;
        showCarMeta();
    }

    export function getAutoInformation(): Engine | Car {
        // ...logic to determine return type based on some rules
        // Unions are valid but don't work as well as return types in all scenarios
        let myCar: Car = {
            color: "Red",
            model: "Mustang",
            manufacturer: "Ford",
            showCarMeta: () => {return 'Hello from myCar';}
        }
        return myCar;
    }

    let carInformation = getAutoInformation();
    console.log(carInformation.manufacturer);
    // The line below is not valid as using a Union type, we can only see memebers that are in common (i.e. 'manufacturer')
    // This value has the type Engine | Car, so we only know for certain that it has members that are in both Engine and Car
    // console.log(carInformation.model);
}

namespace StringLiteralTypes {

    type stringLiteralColors = "red" | "black" | "green" | "orange";

    enum Colors {
        Red = 1,
        Black = 2,
        Green = 3,
        Orange = 4
    }

    // Notice use of Union types in both input and return values being used :)
    function showColor(color: stringLiteralColors | Colors): string | number {
        return color;
    }

    // String literals will have intellisense on the string literal values
    console.log(showColor("red"));
    console.log(showColor("black"));
    // console.log(showColor("gray")); //not a valid literal

    // Enums will have intellisense on the enum options
    console.log(showColor(Colors.Black));
    console.log(showColor(Colors.Green));

    // Sample using a numeric literal type
    function gallonsOfGasEligableDiscount(gallons: 5 | 10 | 15 | 20): number {
        return gallons;
    }

    console.log(gallonsOfGasEligableDiscount(10));
    // The line below is not a valid numeric literal
    // console.log(gallonsOfGasEligableDiscount(12));

}

namespace TypeGuards {

    // Brut force method checking with type assertions littered everywhere
    let myAuto = UnionTypes.getAutoInformation()
    if((<UnionTypes.Car>myAuto).showCarMeta) {
        console.log((<UnionTypes.Car>myAuto).showCarMeta());
    }
    else{
        console.log((<UnionTypes.Engine>myAuto).showEngineMeta());
    }

    // Instead we can use a custom defined Type Guard functions
    function isCar(autoMeta: UnionTypes.Engine | UnionTypes.Car): autoMeta is UnionTypes.Car {
        return (<UnionTypes.Car>myAuto).showCarMeta !== undefined;
    }

    function isEngine(autoMeta: UnionTypes.Engine | UnionTypes.Car): autoMeta is UnionTypes.Engine {
        return (<UnionTypes.Engine>myAuto).showEngineMeta !== undefined;
    }

    if(isCar(myAuto)) {
        console.log(myAuto.showCarMeta());
    }
    else {
        // Notice with intellisense the compiler knows that in this else branch we are not a Car and so must be an engine
        myAuto.showEngineMeta();
    }
}

namespace NullableTypes {

    // For this demo, make sure that in tsconfig.json --strictNullChecks
    let firstName: string = "Allen";
    // Toggle --strictNullChecks and watch behavior
    firstName = null;
    //This is acceptable when included explicitly as a union type
    let lastName: string | null = "Conway";
    lastName = null;

    // Test removing undefined while strictNullChecks is set to true
    let phoneNumber: string | number | null | undefined ;
    phoneNumber = "4071234567";
    phoneNumber = 4071234567;
    phoneNumber = null;
    phoneNumber = undefined;
}