namespace DiscriminatedUnions {

    interface Customer {
        id: number;
        firstName: string;
        lastName: string;
    }

    let myCustomers: Customer[] = [{ id: 1, firstName: "Allen", lastName: "Conway" }];

    // BEFORE: One interface with optional properties trying to describe every possible state
    interface CustomerResponse {
        isLoading?: boolean;
        customers?: Customer[];
        errorMessage?: string;
    }

    // Compiles fine, but makes no sense... still loading, already succeeded, AND failed?
    // Every consumer is left guessing which combination of properties to trust
    let contradictoryResponse: CustomerResponse = {
        isLoading: true,
        customers: myCustomers,
        errorMessage: "Customer service unavailable"
    };

    // AFTER: Each state is its own type, and a shared 'status' literal identifies which one it is
    interface LoadingState {
        status: "loading";
    }

    interface SuccessState {
        status: "success";
        customers: Customer[];
    }

    interface ErrorState {
        status: "error";
        errorMessage: string;
    }

    // The discriminated union: a request is in exactly ONE of these states at a time
    type CustomerState = LoadingState | SuccessState | ErrorState;

    function displayCustomers(state: CustomerState): string {
        // Before checking 'status', TypeScript only allows what every state has in common
        // console.log(state.customers);  // <--uncomment to see error

        switch (state.status) {
            case "loading":
                return "Loading customers...";
            case "success":
                // TypeScript narrowed 'state' to SuccessState, so 'customers' is available - no casting
                return `Loaded ${state.customers.length} customer(s)`;
            case "error":
                // ...and here it's ErrorState, so 'errorMessage' is available
                return `Unable to load customers: ${state.errorMessage}`;
        }
    }

    console.log(displayCustomers({ status: "loading" }));
    console.log(displayCustomers({ status: "success", customers: myCustomers }));
    console.log(displayCustomers({ status: "error", errorMessage: "Customer service unavailable" }));

    // The contradictory state from the BEFORE example can no longer be created
    // let impossibleState: CustomerState = { status: "loading", errorMessage: "Timeout" };  // <--uncomment to see error

}
