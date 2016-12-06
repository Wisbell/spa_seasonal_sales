'use strict'

console.log("seasonal-sales.js Loaded");

// Store the products/department information
var products;
var departments;


function loadProducts(event) {
    console.log("loadProducts function called!")

    console.log("event", event)

    products = JSON.parse(event.target.responseText);

    console.log("products", products)

    //displayDepartments()
}


function loadDepartments(event) {
    console.log("loadDepartments function called!")

    //console.log("event", event);

    departments = JSON.parse(event.target.responseText);

    console.log("departments", departments);

    displayDepartments()
}


function addSeasonOptions(){
    document.getElementById('seasonDiscounts').innerHTML = `<option>Autumn</option>
                                                            <option>Winter</option>
                                                            <option>Spring</option>`
}


function displayDepartments(){
    console.log("displayDepartments function called!")

    var departmentDiv = document.getElementById("departments");

    for(var i = 0; i < departments.categories.length; i++) {
        //console.log(departments.categories[i])
        console.log(departments.categories[i].name)

        departmentDiv.insertAdjacentHTML('afterend', '');
    }


}


// XMLHTTP requests - get the json files

var requestProducts = new XMLHttpRequest();

requestProducts.addEventListener("load", loadProducts);
requestProducts.open("GET", "products.json");
requestProducts.send();

var requestDepartments = new XMLHttpRequest();
requestDepartments.addEventListener("load", loadDepartments);
requestDepartments.open("GET", "categories.json");
requestDepartments.send();


// Testing Function
addSeasonOptions();
