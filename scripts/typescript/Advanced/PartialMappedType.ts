namespace PartialMappedType {

    interface EntryForm {
        firstName: string,
        lastName: string,
        address1: string,
        address2: string,
        state: string,
        zip: string,
        phone: string
    };

    // Remove a single property and there will be an error: expected
    let entryFormFull: EntryForm = {
        firstName: "Jane",
        lastName: "Smith",
        address1: "123 Main Street",
        address2: "",
        state: "LA",
        zip: "70113",
        phone: "555-123-9999"
    } 

    // Make each property optional using a ? (laborious)
    interface PartialEntryForm {
        firstName?: string,
        lastName?: string,
        address1?: string,
        address2?: string,
        state?: string,
        zip?: string
    };

    // all of the properties are optional so 
    let entryFormPartial: PartialEntryForm = {
        firstName: "Jane",
        lastName: "Smith",
        address1: "123 Main Street",
        state: "LA",
        zip: "70113"
    }

    // use the Partial mapped type for the input parameter to the function
    // allows use of the original interface and turns the the code on its head allowing control by the defining target
    function submitEntry(entryForm: Partial<EntryForm>) {
        return Object.keys(entryForm);
    }   

    let entryFormPartialSubmission = {
        firstName: "Emily",
        lastName: "Jones"
    }

    console.log(submitEntry(entryFormFull)); 
    console.log(submitEntry(entryFormPartial)); 
    console.log(submitEntry(entryFormPartialSubmission));

}