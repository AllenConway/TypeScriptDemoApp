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

    // Without using generics
    interface PersonRepository {
        getAll(): Person[]
        save(person: Person);
    }

    // Without using generics
    interface OrderRepository {
        getAll(): Person[]
        save(person: Person);
    }

    // Using Generics
    interface GenericRepository<T> {
        getAll(): T[]
        save(value: T);
    }

    //Without Generics
    interface PersonService {
        save(person: Person);
    }

    //Using Generics
    interface CrudService<T> {
        save(value: T);        
    }

    class PersonApiService implements PersonService {
        save(person: Person) {
            //Persist Person object downstream...
            console.log(`Saved Person with id: ${person.id}`);
        }        
    }

    class PersonCrudService implements CrudService<Person> {
        save(value: Person) {
        //Persist Person object downstream...
        console.log(`Saved Person with id: ${value.id}`);
        }   
    }

    class PersonRepository implements GenericRepository<Person> {

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

        save(value: Person) {            
            this.personApiService.save(value);
            console.log(`Saved the following data: ${JSON.stringify(value)}`);
        }

    }


    //Create a person and save using the Repository
    let peoplePerson = new Person();
    peoplePerson.id = 5;
    peoplePerson.firstName = "Allen";
    peoplePerson.lastName = "Conway";    

    let personApiService: PersonApiService = new PersonApiService();
    let repo: PersonRepository = new PersonRepository(personApiService);
    repo.save(peoplePerson);
    
    let order = new Order();
    //Will not work as the type declare isn't correct.
    //'repo' is of type PersonRepository which implements GenericRepository<Person>, not order
    //repo.save(order);
}  