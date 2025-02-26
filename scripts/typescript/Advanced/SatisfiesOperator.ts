namespace SatisfiesOperator {
  // The `satisfies` operator is a TypeScript feature that ensures an object  
  // conforms to a specific type without changing its inferred type.
  // The syntax of the `satisfies` operator is as follows:
  // const obj = { ... } satisfies Type;
  // In this syntax, `obj` is the object to check, and `Type` is the type to check against.
  // For example, you can use the `satisfies` operator to ensure that an object conforms to an interface:

  interface Customer {
    firstName: string;
    lastName: string;
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zip: string;
  }

  const customer = {
    firstName: "Allen",
    lastName: "Conway",
    address1: "123 Main St.",
    city: "Asheville",
    state: "NC",
    zip: "28802",
  } satisfies Customer; // ✅ TypeScript ensures `customer` conforms to `Customer` while preserving its inferred type

  // TypeScript ensures that `customer` conforms to the `customer` interface, but it does not remove the `extraProperty`.
  // This means you can still access `extraProperty` on `user`:
  console.log(customer.firstName);

  // If `user` did not conform to the `User` interface, TypeScript would raise a type error.

  // Example with let and var
  let customerExtraProp1 = {
    firstName: "Allen",
    lastName: "Conway",
    address1: "123 Main St.",
    city: "Asheville",
    state: "NC",
    zip: "28802",
    //phone: "828-456-7890"  // <--uncomment to see error
  } satisfies Customer; // ❌ This will cause a type error because object literals are strictly checked

  var customerExtraProp2 = {
    firstName: "Allen",
    lastName: "Conway",
    address1: "123 Main St.",
    city: "Asheville",
    state: "NC",
    zip: "28802",
    //email: "allen@allenconway.net" // <--uncomment to see error
  } satisfies Customer; // ❌ This will cause a type error because object literals are strictly checked

  interface UserProfile {
    name: string;
    email: string;
  }

  function getUserFromApi(): UserProfile {
    // Simulate an API response. Don't return directly to allow example 
    // of additional properties not in the interface
    const apiResponse = {
      name: "Allen",
      email: "allen@allenconway.net",
      role: "admin",
      lastLogin: "2025-02-25",
    };

    return apiResponse;
  }

  const user = getUserFromApi() satisfies UserProfile;

  // ✅ `user` has `name` and `email` (valid)
  console.log(user.name);
  console.log(user.email);
  // ❌ Exists at runtime, but TypeScript won't auto-suggest or allow direct access
  // console.log(user.role); // <--uncomment to see error

  // Contrast `satisfies` with `as`:
  // In this example, we use `as` to cast the result of `getUserFromApi` to `UserProfile`.
  // This allows us to access the properties defined in `UserProfile`, but it also allows us to access extra properties
  // by casting to `any`, which is not type-safe and should be used with caution.
  const fullApiResponse = getUserFromApi() as UserProfile;
  console.log(fullApiResponse.name); // Works
  console.log(fullApiResponse.email); // Works
  console.log((fullApiResponse as any).role); // Works, but not type-safe

}