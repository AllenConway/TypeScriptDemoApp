namespace ExtendingInterfaces {

    interface Error  {
        errorId?: number;
        status?: number;
        detail?: string;
    }

    interface ApiResponse<T, K> extends Error {
        data: T[];
        id: K;
        type: string;
    }

    interface Customer {
        firstName: string;
        lastName: string;
        address1: string;
        address2?: string;
        city: string;
        state: string;
        zip: string;
    }

    let myCustomer: Customer[] = [{
        firstName: "Allen",
        lastName: "Conway",
        address1: "123 Main St.",
        city: "Asheville",
        state: "NC",
        zip: "28715"
    }];

    // Mock response values, with and without error metadata.
    let apiResponseNoError: ApiResponse<Customer, number> = {
        data: myCustomer,
        id: 123,
        type: "customer",
        errorId: 0,
        status: 200,        
    }

    let apiResponseWithError: ApiResponse<Customer, number> = {
        data: [],
        id: 0,
        type: "",
        errorId: 4,
        status: 400,
        detail: "The customerId was not provided"        
    }

    console.log(`Here is the API response with valid data: ${JSON.stringify(apiResponseNoError)}`);
    console.log(`Here is the API response when an error returns: ${JSON.stringify(apiResponseWithError)}`);

}

