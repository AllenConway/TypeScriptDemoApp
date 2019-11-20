namespace StrictPropertyInitializationChecks { 

    // // Each field will show an error
    // class Person {
    //     firstName: string;
    //     lastName: string;
    //     address1: string;
    //     address2: number;
    // }

    // // Using the optional field which includes undefined will be acceptable
    // class Person {
    //     firstName: string = "Allen";
    //     lastName: string;
    //     address1: string;
    //     address2?: number;
    // }

    // This version of the class will satisfy the strict property initialization checks
    // class Person {
    //     firstName: string = "Allen";
    //     lastName: string = "Conway";
    //     address1: string = "123 Main St";
    //     address2?: number;
    // }

    // This version also satisfies the the strict property initialization checks and uses '!' to supress the error
    // class Person {
    //     firstName: string = "Allen";
    //     lastName: string = "Conway";
    //     address1!: string;  // Suppress strict initialization check
    //     address2?: number;
    // }

}