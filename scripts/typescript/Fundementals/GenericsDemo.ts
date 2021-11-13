import { Engine } from './ModuleDemo';
module GenericsDemo {

    interface GenericRepository<T> {
        getAll(): T[];
        save(entity: T);
    }


    interface ApiResponse<T> {
        errors: any;
        data: T;
        id;
    }

    interface Test2 extends ApiResponse<Test2>  {


    }
   

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

    class PersonRepository implements GenericRepository<Person> {
        getAll(): Person[] {

            //Just return some static data
            //let people: Person[] = [];
            const people: Array<Person> = new Array<Person>();

            const person1: Person = new Person();
            person1.id = 1;
            person1.firstName = "John";
            person1.lastName = "Smith";
            people.push(person1);

            const person2: Person = new Person();
            person2.id = 2;
            person2.firstName = "Jane";
            person2.lastName = "Smith";
            people.push(person2);            

            return people;
        }

        save(entity: Person) {
            //Save Person entity instance to the database
        }

    }



    //Create a person and save using the Repository
    let peoplePerson = new Person();
    peoplePerson.id = 5;
    peoplePerson.firstName = "Allen";
    peoplePerson.lastName = "Conway";



    const repo: PersonRepository = new PersonRepository();
    repo.save(peoplePerson);

    //Will not work
    const order = new Order();
    //repo.save(order);
}  