'use strict'

//console.log("seasonal-sales.js Loaded");

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

        departmentDiv.insertAdjacentHTML('afterbegin', `<div id="${departments.categories[i].name}">
                                                        <h2>${departments.categories[i].name}</h2>
                                                        </div>`);
    }
}


function displayProducts(){
    console.log("displayProducts function called")

    for (var i = 0; i < products.products.length; i++){
        //console.log(products.products[i])


        //console.log("this should be an integer", products.products[i].category_id)

        if(products.products[i].category_id === 1){
            //console.log("this hsould be an integer", products.products.category_id)
            document.getElementById("Apparel").insertAdjacentHTML('beforeend', `<p>${products.products[i].name}</p>
                                                                                <p>${products.products[i].price}</p>`)

        } else if (products.products[i].category_id === 2){
            //console.log("this hsould be an integer", products.products.category_id)
            document.getElementById("Furniture").insertAdjacentHTML('beforeend', `<p>${products.products[i].name}</p>
                                                                                <p>${products.products[i].price}</p>`)

        } else if (products.products[i].category_id === 3) {
            //console.log("this hsould be an integer", products.products.category_id)
            document.getElementById("Household").insertAdjacentHTML('beforeend', `<p>${products.products[i].name}</p>
                                                                                <p>${products.products[i].price}</p>`)
        } else {
            console.log("Something broke")
        }
    }


}

function seasonDiscounts(event){
    console.log("seasonDiscounts function called")


    console.log("event", event)

    // create options on the DOM

    var discountSelected = document.getElementById("seasonDiscounts").value;  // .selectedIndex?

    console.log(discountSelected);

}

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

// Testing Function
//addSeasonOptions();
