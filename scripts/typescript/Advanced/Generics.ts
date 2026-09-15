namespace Generics {
    // TKey defaults to number because most entities key on a numeric id
    interface Entity<TKey = number> {
        id: TKey;
    }

    interface Person extends Entity {
        firstName: string;
        lastName: string;
    }

    interface Order extends Entity {
        quantity: number;
        description: string;
    }

    enum PersonType {
        Happy,
        Excited
    }

    //Without Generics
    interface PersonService {
        save(person: Person, personType: PersonType);
    }

    //Using Generics
    interface CrudService<T> {
        save(value: T);
    }

    // Implementing interface without generics
    class PersonApiService implements PersonService {
        save(person: Person, personType: PersonType) {
            //Persist Person object downstream...
            console.log(`Saved Person with id: ${person.id} of type '${PersonType[personType]}'`);
        }
    }

    // Implementing interface using generics
    class PersonCrudService implements CrudService<Person> {
        save(value: Person) {
            //Persist Person object downstream...
            console.log(`Saved Person with id: ${value.id}`);
        }
    }

    // Implementing interface using generics
    class OrderCrudService implements CrudService<Order> {
        save(value: Order) {
            //Persist Order object downstream...
            console.log(`Saved Order with id: ${value.id}`);
        }
    }

    // Without using generics
    interface ConcretePersonRepository {
        getAll(): Person[];
        save(person: Person);
    }

    // Using Generics now we have a single version of the repository
    // with the type to be provided later by consuming code
    interface GenericRepository<T, K> {
        getAll(): T[];
        save(value: T, otherValue: K);
    }


    class PersonRepository implements GenericRepository<Person, PersonType> {

        constructor(private personApiService: PersonApiService) { }

        getAll(): Person[] {
            //return some sample static data
            return [
                { id: 1, firstName: "John", lastName: "Smith" },
                { id: 2, firstName: "Jane", lastName: "Smith" }
            ];
        }

        save(value: Person, personType: PersonType) {
            this.personApiService.save(value, personType);
            console.log(`Saved the following data: ${JSON.stringify(value)} of type '${PersonType[personType]}'`);
        }

    }

    //Create a person and save using the Repository
    let peoplePerson: Person = { id: 5, firstName: "Allen", lastName: "Conway" };

    let personApiService: PersonApiService = new PersonApiService();
    let repo: PersonRepository = new PersonRepository(personApiService);
    repo.save(peoplePerson, PersonType.Happy);


    let order: Order = { id: 100, quantity: 2, description: "Widget" };
    //Will not work as the type declare isn't correct.
    //'repo' is of type PersonRepository which implements GenericRepository<Person>, not order
    //repo.save(order, null);

    // Example using a class with a generic parameter
    class HyphenateArray<T> {

        makeArrayHyphenated(input: T[]): string {
            return input.join("-");
        }

    }

    let haTStr = new HyphenateArray<string>();
    let arrayTStr: string[] = ['a', 'b', 'c'];
    console.log(haTStr.makeArrayHyphenated(arrayTStr));

    let haTNum = new HyphenateArray<number>();
    let arrayTNum: number[] = [55, 99, 122]; 
    console.log(haTNum.makeArrayHyphenated(arrayTNum));

    // This will cause an error
    // let arrayTBool: boolean[] = [true, false];
    // let test = haTNum.makeArrayHyphenated(arrayTBool);   

    // The constraint means TEntity isn't 'any type' - it must be something with an id
    class ApiService<TEntity extends Entity<string | number>> {

        constructor(private resource: string) { }

        getAll(): TEntity[] {
            console.log(`GET /api/${this.resource}`);
            return [];
        }

        getById(id: TEntity["id"]): TEntity | undefined {
            console.log(`GET /api/${this.resource}/${id}`);
            return undefined;
        }

        update(id: TEntity["id"], changes: Partial<TEntity>): TEntity | undefined {
            console.log(`PUT /api/${this.resource}/${id}`, changes);
            return undefined;
        }

    }

    let personApi = new ApiService<Person>("people");
    personApi.getAll();
    personApi.getById(1);
    personApi.update(1, { firstName: "Allen" });

    let orderApi = new ApiService<Order>("orders");
    orderApi.update(100, { quantity: 5 });

    // Invoices key on a string id, so the default type on Entity gets overridden
    interface Invoice extends Entity<string> {
        amount: number;
    }

    let invoiceApi = new ApiService<Invoice>("invoices");
    invoiceApi.getById("INV-001");

    // These will cause errors
    // personApi.getById("1");                      // Person ids are numbers, not strings
    // personApi.update(1, { email: "a@b.com" });   // 'email' is not a property of Person

}  