namespace Generics {
    class Person {
        public id: number;
        public firstName: string;
        public lastName: string;
    }

    class Order {
        public id: number;
        public quantity: number;
        public description: string;
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
        save(person: Person) {
            //Persist Person object downstream...
            console.log(`Saved Person with id: ${person.id}`);
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

    // Without using generics
    interface ConcreteOrderRepository {
        getAll(): Order[];
        save(person: Order);
    }

    // Using Generics now we have a single version of the repository
    // with the type to be provided later by consuming code
    interface GenericRepository<T, K> {
        getAll(): T[];
        save(value: T, otherValue: K);
    }

    enum PersonType {
        Happy,
        Excited
    }
    class PersonRepository implements GenericRepository<Person, PersonType> {

        constructor(private personApiService: PersonApiService) { }

        getAll(): Person[] {
            let people: Array<Person> = new Array<Person>();
            //let people: Person[] = []; //alternate way to declare

            //return some sample static data
            let person1: Person = new Person();
            person1.id = 1;
            person1.firstName = "John";
            person1.lastName = "Smith";
            people.push(person1);

            let person2: Person = new Person();
            person2.id = 2;
            person2.firstName = "Jane";
            person2.lastName = "Smith";
            people.push(person2);

            return people;
        }

        save(value: Person, personType: PersonType) {
            this.personApiService.save(value);
            console.log(`Saved the following data: ${JSON.stringify(value)} of type '${PersonType[personType]}'`);
        }

    }

    //Create a person and save using the Repository
    let peoplePerson = new Person();
    peoplePerson.id = 5;
    peoplePerson.firstName = "Allen";
    peoplePerson.lastName = "Conway";

    let personApiService: PersonApiService = new PersonApiService();
    let repo: PersonRepository = new PersonRepository(personApiService);
    repo.save(peoplePerson, PersonType.Happy);


    let order = new Order();
    //Will not work as the type declare isn't correct.
    //'repo' is of type PersonRepository which implements GenericRepository<Person>, not order
    //repo.save(order);

    // Example using a class with a generic parameter
    class hyphenateArray<T> {

        makeArrayHyphenated(input: T[]): T[] {                        
            return input.reduce((prevValue, currentValue) => prevValue.concat(currentValue, "-"), []);
        }

    }

    let haTStr = new hyphenateArray<string>();
    let arrayTStr: string[] = ['a', 'b', 'c'];
    console.log(haTStr.makeArrayHyphenated(arrayTStr));

    let haTNum = new hyphenateArray<number>();
    let arrayTNum: number[] = [55, 99, 122]; 
    console.log(haTNum.makeArrayHyphenated(arrayTNum));

    // This will cause an error
    // let arrayTBool: boolean[] = [true, false];
    // let test = haTNum.makeArrayHyphenated(arrayTBool);   
    
}  