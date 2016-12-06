'use strict'

console.log("seasonal-sales.js Loaded")




function loadProducts(event) {
    console.log("loadProducts function called!")

    console.log("event", event)

    var data = JSON.parse(event.target.responseText);


    console.log("data", data)
}








var requestJson = new XMLHttpRequest();

requestJson.addEventListener("load", loadProducts);
requestJson.open("GET", "products.json");
requestJson.send();
