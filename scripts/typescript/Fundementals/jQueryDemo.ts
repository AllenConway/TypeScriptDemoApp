//// <reference path="../../node_modules/@types/jquery/index.d.ts" />
import $ from "jquery";
// import { Employee } from "./DecoratorsDemo.js";
import { ContactInfo } from './ContactInfo';


//module JQueryTest {
"use strict";
//const $ = JQuery.default;

export class ColorChange {
    constructor() {
    }

    setElementColor(id: string, color: string) {
        //Use jQuery ID selector and css method to update the color style property
        $("#" + id).css("color", color);
    }

}

//}

window.onload = () => {
    const colorChange = new ColorChange();
    colorChange.setElementColor("mainTitle", "red");

    // const employee = new Employee();
    // employee.getSalary();    

    const contactInfo = new ContactInfo();
    contactInfo.getContactInfo();

    //testDecorator();
};


//function testDecorator() {
//    let employee = new Employee();

//    try {
//        employee.getSalary = () => console.log("this isn't going to work");
//    } catch (err) {
//        console.log(err);
//    }

//}