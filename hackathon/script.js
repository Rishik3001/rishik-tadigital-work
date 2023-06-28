import data from './cars.json' assert{type: 'json'}; //Importing  my json
console.log(data)
const fetchproducts = () => {
    renderCars(data);
};

let productContainer = "",
    div1 = document.getElementById('cars');

//renderCars renders cars on the page
const renderCars = (mydata) => {
    for (let i in mydata) {
        productContainer += '<div id="car_div_styling" class="car_div_styling"><img class= "img-stylng" src="' + mydata[i].image + '" alt="' + mydata[i].name + '"/><br><div class="car_desc"><p class="car_name">' + mydata[i].name + '</p><p class="desc">' + mydata[i].description + '</p><a href="customs.html?car=' + i + '"><buton class="build_and_buy">Build and buy</button></a></div></div>';
    }
    div1.innerHTML = productContainer;
};

//fetchproducts is called on window onload to run all the functions initially
window.onload = fetchproducts();
console.log(data);
