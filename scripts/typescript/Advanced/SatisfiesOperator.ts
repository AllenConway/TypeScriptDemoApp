namespace SatisfiesOperator {
  interface Customer {
    id: string | number;
    firstName: string;
    lastName: string;
  }

  // Example 1: Type annotation vs. `satisfies`

  // Annotation: the variable's type BECOMES Customer, so id is `string | number`.
  const customer1: Customer = {
    id: 1,
    firstName: "Allen",
    lastName: "Conway"
  };
  // customer1.id.toFixed(0); // Error: 'toFixed' does not exist on type 'string'

  // `satisfies`: TypeScript checks the object against Customer,
  // but keeps the more specific inferred type, so id is known to be a `number`.
  const customer2 = {
    id: 2,
    firstName: "Jane",
    lastName: "Smith"
  } satisfies Customer;
  console.log(customer2.id.toFixed(0)); // Works

  // Example 2: `satisfies` vs. `as`

  // `as` is a type assertion: "Trust me, this is a Customer."
  // TypeScript allows it even though lastName is missing.
  const customer3 = {
    id: 3,
    firstName: "Sam"
  } as Customer;
  console.log(customer3.lastName); // undefined at runtime - no compile-time warning!

  // `satisfies` checks compatibility instead of trusting us.
  // const customer4 = {
  //   id: 4,
  //   firstName: "Sam"
  // } satisfies Customer;
  // Error: Property 'lastName' is missing in type '{ id: number; firstName: string; }'

  // Example 3: Compile-time only

  // `satisfies` is erased when TypeScript compiles to JavaScript.
  // It does NOT validate JSON or API responses at runtime - use runtime validation for that.

  // JSON.parse() returns `any`, and `any` passes every type check - so no error here,
  // even though the JSON is missing id and lastName.
  const parsed = JSON.parse('{ "firstName": "Allen" }') satisfies Customer; // No error!
  console.log(parsed.lastName); // undefined at runtime

  // Key takeaway: `satisfies` checks that a value meets a type's requirements
  // without unnecessarily replacing the type TypeScript inferred for that value.
}