'use strict'

//console.log("seasonal-sales.js Loaded");

// Store the products/department information globally, so it can be accessed
var productsList;
var departments;


function loadProducts(event) {
    console.log("loadProducts function called!")

    console.log("event", event)

    productsList = JSON.parse(event.target.responseText);

    console.log("products", productsList)

    //displayDepartments()
}


function loadDepartments(event) {
    console.log("loadDepartments function called!")

    //console.log("event", event);

    departments = JSON.parse(event.target.responseText);

    //console.log("departments", departments);

    displayMain()
}


function addSeasonOptions(){
    document.getElementById('seasonDiscounts').innerHTML = `<option>No Discount</option>
                                                            <option>Autumn</option>
                                                            <option>Winter</option>
                                                            <option>Spring</option>`
}


function displayDepartments(){
    console.log("displayDepartments function called!")

    var departmentDiv = document.getElementById("departments");

    for(var i = 0; i < departments.categories.length; i++) {
        //console.log(departments.categories[i])
        //console.log(departments.categories[i].name)

        departmentDiv.insertAdjacentHTML('afterbegin', `<div class="department" id="${departments.categories[i].name}">
                                                        <h2>${departments.categories[i].name}</h2>
                                                        </div>`);
    }
}


function displayProducts(){
    console.log("displayProducts function called")

    for (var i = 0; i < productsList.products.length; i++){
        //console.log(products.products[i])

        if(productsList.products[i].category_id === 1){

            //document.getElementById("Apparel").innerText = '';
            document.getElementById("Apparel").insertAdjacentHTML('beforeend', `<p class="name">${productsList.products[i].name}</p>
                                                                                <p class="price">${productsList.products[i].price}</p>`)
        } else if (productsList.products[i].category_id === 2){
            //document.getElementById("Furniture").innerText = '';
            document.getElementById("Furniture").insertAdjacentHTML('beforeend', `<p class="name">${productsList.products[i].name}</p>
                                                                                  <p class="price">${productsList.products[i].price}</p>`)
        } else if (productsList.products[i].category_id === 3) {
            //document.getElementById("Household").innerText = '';
            document.getElementById("Household").insertAdjacentHTML('beforeend', `<p class="name">${productsList.products[i].name}</p>
                                                                                  <p class="price">${productsList.products[i].price}</p>`)
        } else {
            console.log("Something broke")
        }
    }
}


function seasonDiscounts(event){
    console.log("seasonDiscounts function called")

    //console.log("event", event)

    var discountSelected = document.getElementById("seasonDiscounts").value;  // .selectedIndex?

    //console.log(discountSelected);

    // This function will prevent applying multiply discounts if the option is switched multiply times
    resetPrices();


    // Add winter discounts
    if (discountSelected === "Winter") {

        var winter_stuff = document.getElementById("Apparel").getElementsByClassName('price');

        for(var i = 0; i < winter_stuff.length; i++) {

            var discount = (((winter_stuff[i].innerText * 100) * .1)/100).toFixed(2);
            winter_stuff[i].innerText = winter_stuff[i].innerText - discount;
        }

    // Add Autumn discounts
    } else if (discountSelected === "Autumn") {

        var autumn_stuff = document.getElementById("Furniture").getElementsByClassName('price');

        for(var i = 0; i < autumn_stuff.length; i++) {

            var discount = (((autumn_stuff[i].innerText * 100) * .3)/100).toFixed(2);
            autumn_stuff[i].innerText = autumn_stuff[i].innerText - discount;
        }

    // Add Spring discounts
    } else if (discountSelected === "Spring") {

        var spring_stuff = document.getElementById("Household").getElementsByClassName('price');

        for(var i = 0; i < spring_stuff.length; i++) {

            var discount = (((spring_stuff[i].innerText * 100) * .15)/100).toFixed(2);
            spring_stuff[i].innerText = spring_stuff[i].innerText - discount;
        }

    // Return discounts to normal price
    } else {

        console.log("return prices to normal")

        resetPrices();

    }
}


function resetPrices () {
    document.getElementById('departments').innerHTML = '';
    displayDepartments();
    displayProducts();
}


// Combine all display functions into one
function displayMain() {
    addSeasonOptions();
    displayDepartments();
    displayProducts();
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

// Event listener for select dropdown
document.getElementById("seasonDiscounts").addEventListener('change', seasonDiscounts);
