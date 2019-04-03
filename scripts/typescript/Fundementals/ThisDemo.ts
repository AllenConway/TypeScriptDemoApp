class MyTsClass {

    private myValue: number = 0;

    myNamedFunction(): void {
        //Using a function for the callback will not provde the proper scope for this
        //setTimeout(function() {
        //Fat arrow provides proper scope for this in TS
        setTimeout(() => {
            console.log(`Inside myNamedFunction, this.myValue = ${this.myValue}`);
        }, 1000);
    }

    myFatArrowFunction = (someValue: number) => {
        this.myValue = someValue;
        console.log(`Inside myFatArrowFunction, this.myValue = ${this.myValue}`);
    }
}

const myClass = new MyTsClass();          
myClass.myFatArrowFunction(1);
myClass.myNamedFunction();