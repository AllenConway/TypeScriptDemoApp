import { IEngine } from './ModuleDemo';
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

    interface ITest2 extends ApiResponse<ITest2>  {


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
            //var people: Person[] = [];
            var people: Array<Person> = new Array<Person>();

            var person1: Person = new Person();
            person1.id = 1;
            person1.firstName = "John";
            person1.lastName = "Smith";
            people.push(person1);

            var person2: Person = new Person();
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
    var peoplePerson = new Person();
    peoplePerson.id = 5;
    peoplePerson.firstName = "Allen";
    peoplePerson.lastName = "Conway";



    var repo: PersonRepository = new PersonRepository();
    repo.save(peoplePerson);

    //Will not work
    var order = new Order();
    //repo.save(order);
}  