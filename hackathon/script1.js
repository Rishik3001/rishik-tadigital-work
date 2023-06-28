import data from './cars.json' assert{type: 'json'}; //Importing  my json

let init = () => {
    filterFunction(data);
}

// whole customization functionality
const filterFunction = (mydata) => {
    let selectedColor = "white";
    let selectedAlloy = "alloy1";
    let seatColor = "cover1";
    let seatPrice = 0;
    let alloyPrice = 0;

    const parameter = getQueryParams();
    console.log(parameter)
    let baseprice = mydata[parameter].basePrice;
    console.log(baseprice)
    document.getElementById("selected-car").src = mydata[parameter].baseimage;

    // this click shows the car with selected color 
    document.querySelectorAll("input[name='color']").forEach((elem) => {
        elem.addEventListener("click", function (event) {
            selectedColor = event.target.value;
            document.getElementById("selected-car").src = mydata[parameter]["color"][selectedColor].image;
            document.getElementById("total_price").innerHTML = "<span>$" + baseprice + "</span>";
        });
    });

     // this click changes the alloys on the selected car color
    document.querySelectorAll("input[name='alloy']").forEach((elem) => {
        elem.addEventListener("click", function (event) {
            selectedAlloy = event.target.value;
            document.getElementById("selected-car").src = mydata[parameter]["color"][selectedColor]["alloy"][selectedAlloy].image;
            alloyPrice = mydata[parameter]["color"][selectedColor]["alloy"][selectedAlloy].price;
            document.getElementById("total_price").innerHTML = "<span>$" + alloyPrice + "</span>";
        });
    });

    // this click shows seat covers
    document.querySelectorAll("input[name='seat-cover']").forEach((elem) => {
        elem.addEventListener("click", function (event) {
            seatColor = event.target.value;
            document.getElementById("selected-car").src = mydata[parameter]["seat"][seatColor].image;
            seatPrice = mydata[parameter]["seat"][seatColor].price;
            document.getElementById("total_price").innerHTML = "<span>$" + seatPrice + "</span>";
        });
    });

    // total build (BUY button)
    document.getElementById("buy").addEventListener('click', function (e) {
        let totalCarPrice = baseprice + seatPrice + alloyPrice;
        document.getElementById("total_build_price").innerHTML = "<span class= price_span >Total Build $" + totalCarPrice + "</span>";
    })
}

// gets index of query parameter
function getQueryParams() {
    const paramArr = window.location.href.slice(window.location.href.indexOf('?') + 1);
    const [key, val] = paramArr.split('=');
    return val || 0;
}

window.onload = init();




