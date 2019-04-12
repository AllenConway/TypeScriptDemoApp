(function () {

    //In JavaScript, var declarations are "hoisted" to the top of their enclosing scope. This can result in confusing bugs:
    //variable 'i' will be hoisted here after declared
    //var i;
 
    console.log(i); //undefined because variable is not 'hoisted' until declared
 
    for (var i = 0; i < 5; i++) {
       var j = i;
    }
 
    //'i' technically should be out of scope (traditionally thinking)
    //What will be displayed in the alert??
    //undefined or '5'
    //'i' is available because of variable hoisting or being 'lifted' to the top of the function
    console.log(i);  //5
 
 }());  //IIFE, run this Immediately
 
 
 //Demo: variable mess in JS
 (function () {
 
    var user = "Allen";
    console.log('user value: ' + user);  //user value: Allen
 
    //1000 lines of JS later :S
 
    user = 1234;  //isn't user an ID??
    console.log('user value: ' + user); //user value: 1234
 
    //Another 1000 lines of JS later
    user = user + ' Conway';
    console.log('user value: ' + user); //user value: 1234 Conway
 
    //No type checking in JS, so this multiplication to assign value to what was a string succeeds at build.
    //var userId = "1234";
    var userId = "Allen";
    user = userId * 1;
    console.log('user value: ' + user);  //NaN
 
    OutsideScope();
 
 }());  //IIFE, run this Immediately
 
 
 //If using raw JS, be sure to hand roll scope using an IIFE or ES6 class and creating closure (also module/revealing module pattern)
 function OutsideScope() {
 
    //No warning or error on build that 'user' is not in scope here
    console.log("Outside Scope user value: " + user);  //'user is not defined' in debug window
 }