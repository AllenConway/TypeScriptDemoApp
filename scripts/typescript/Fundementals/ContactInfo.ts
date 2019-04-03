import { Person } from "./Person.js";
export class ContactInfo{

    getContactInfo() {
        const person = new Person();
        const address = person.getAddress();
        console.log(`The address is: ${address}`)
    }

}