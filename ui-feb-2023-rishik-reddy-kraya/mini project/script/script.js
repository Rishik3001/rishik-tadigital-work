import mobile from './mobiledata.json'assert{type:'json'};

// console.log(mobile);
// document fragment??

// loading all cards at first
function loadCard() {
    for(var i=0 ;i<mobile.length;i++ ) {
        const box = `
        <div class="cards">
        <div class="add-wish"><span><i class="fa-solid fa-heart"></i></span></div>
        <div class="images"><img src=  ${mobile[i].productImage} alt="phones images"></div>
        <div class="mobile-cart hover-cart">
        <div><a class="addToCart" href="#">Add to cart </a></div>
        <div><a href="#">View Gallery</a></div>
        </div>
        <div class="mob-details">
        <div id="mname"><p>${mobile[i].name}</p></div>
        <div class="rating star1" id=${mobile[i].rating}>
            <i class="fa-solid fa-star "></i>
            <i class="fa-solid fa-star "></i>
            <i class="fa-solid fa-star "></i>
            <i class="fa-solid fa-star "></i>
            <i class="fa-solid fa-star "></i>
        </div>
            <span>${mobile[i].totarating}</span>
        <div class="price-info">
        <div id="mprice"><p> $${mobile[i].price}</p></div>
        <div id="oriprice"><p>${mobile[i].originalprice}</p></div>
        <div id="oprice"><p>${mobile[i].offer}</p></div>
        </div>
        </div>
        </div>
        `   
        document.getElementById("phones").innerHTML+= box;
    }
}
loadCard();
wishList();
ratingColor();
addCart();

//for creating single card for rendering purpose while we select any function
function oneCard (i){
    const card = `<div class="cards">
    <div class="add-wish"><span><i class="fa-solid fa-heart"></i></span></div>
    <div class="images"><img src=  ${mobile[i].productImage} alt=""></div>
    <div class="mobile-cart">
    <div><a href="">Add to cart </a></div>
    <div><a href="">View Gallery</a></div>
    </div>
    <div class="mob-details">
    <div id="mname"><p>${mobile[i].name}</p></div>
    <div class="rating star1" id=${mobile[i].rating}>
        <i class="fa-solid fa-star "></i>
        <i class="fa-solid fa-star "></i>
        <i class="fa-solid fa-star "></i>
        <i class="fa-solid fa-star "></i>
        <i class="fa-solid fa-star "></i>
    </div>
        <span>${mobile[i].totarating}</span>
    <div class="price-info">
    <div id="mprice"><p>$${mobile[i].price}</p></div>
    <div id="oriprice"><p>${mobile[i].originalprice}</p></div>
    <div id="oprice"><p>${mobile[i].offer}</p></div>
    </div>
    
    </div>
    </div>
    `
    document.getElementById("phones").innerHTML+=card
}

//rendering brands name using JSON
let company = mobile.map(item => item.brand).filter((v,index,self) => self.indexOf(v)===index);
// console.log(company) 
for (var i=0;i<company.length;i++){
    filterBrand(i);
}
function filterBrand(i){
    const brand=`<div class="filter-brand">
    <div><input type="checkbox"  id="${company[i]}" class="brand-names" ><span>${company[i]}</span></div>
</div>`
document.getElementsByClassName("filter-brand")[0].innerHTML+=brand
}


//getting the phones on clicking the respective brand----------------
var arr = []
var temp = document.getElementsByClassName("brand-names")
// console.log(temp)
for(i=0; i<temp.length;i++){
    temp[i].addEventListener("click",onClickHandler);
}

function onClickHandler(){
    var filteredBrand = []
    document.getElementById("phones").innerHTML=""
    if(this.checked){
        arr.push(this.id)    
    }
    else {
        for(i=0;i<arr.length;i++){
            if(arr[i]==this.id){
                arr.splice(i,1)
            }
        }
        console.log(arr,"juykukt")
    }

    if(arr.length==0){
        loadCard();
    }

    for(var i=0;i<mobile.length;i++){

        for(var j=0;j<arr.length;j++){
            if(mobile[i].brand===arr[j]){
                filteredBrand.push(mobile[i].id);
            }  
        }
    }
    // console.log(arr,filteredBrand)
    for(let i=0 ;i<filteredBrand.length;i++){
        oneCard(filteredBrand[i]-1);
        // console.log(i)
    }
    console.log("this",filteredBrand,"id")
    wishList();
    ratingColor();
    addCart();
}


//function for getting the rating from json file
function ratingColor(){
    let stars = document.getElementsByClassName("star1");
// console.log(stars);
// stars[0].classList.add("red");
for(let i=0;i<stars.length;i++){
    // console.log("the child nodes are");
    let new_stars=stars[i].children
    let val=stars[i].id
    for(let j=0;j<new_stars.length;j++){
        if(j<val){
            new_stars[j].classList.add("red")
        }
    }
}
}

var wishCount = (sessionStorage.getItem("wishlistCount")) 
if(wishCount == false){
    wishCount = 0
}
document.getElementById("valueIncrease").innerHTML=wishCount

//functions for adding phones to wishList
function wishList(){ 
    var value=document.getElementsByClassName("fa-solid fa-heart");
    for(var i=0;i<value.length;i++){
        var heart=value[i];
        heart.style.color="rgb(183, 189, 193)"
        console.log(heart.style.color)
        heart.addEventListener("click",function(){
            if(this.style.color=="rgb(183, 189, 193)"){
                this.style.color="red"
                var count= document.getElementById("valueIncrease").innerHTML++
                sessionStorage.setItem("wishlistCount", count+1)
            }
            else if(this.style.color=="red"){
                this.style.color="rgb(183, 189, 193)"
                var count= document.getElementById("valueIncrease").innerHTML--
                sessionStorage.setItem("wishlistCount", count+1)
            }
        })
    }
} 

//function for adding phones to cart
function addCart(){
    var value =document.getElementsByClassName("addToCart");
    for(var i=0;i<value.length;i++){
        var cart = value[i];
        cart.style.backgroundColor="#FF3465"
        // console.log("gg")
        cart.addEventListener("click",function(){
            //  if(this.style.backgroundColor == "black")
            //     {this.style.backgroundColor="#FF3465"
            //     document.getElementById("cartIncrease").innerHTML--
            // }
                document.getElementById("cartIncrease").innerHTML++
                this.style.backgroundColor="black"
                // document
            // else if(this.style.backgroundColor == "black"){
            //     this.style.backgroundColor=
            // }
        })
    }
}

//functions for sorting phones based on price
document.getElementById("low-high").addEventListener("click",lowToHigh)
function lowToHigh() {
    document.getElementById("phones").innerHTML=""
    mobile.sort((x,y) => x.price - y.price);
    for(var i=0;i<mobile.length;i++) {
        console.log(mobile[i])
        oneCard(i);
    }
    ratingColor();
    wishList();
}

// function for sorting phones based on rating
document.getElementById("sortrating").addEventListener("click",ratingSort)
function ratingSort(){
    document.getElementById("phones").innerHTML=""
    mobile.sort((x,y) => y.rating - x.rating);
    for(var i=0;i<mobile.length;i++) {
        console.log(mobile[i])
        oneCard(i);
    }
    ratingColor();
    wishList();  
}
//functions for sorting phones based on date
document.getElementById("new-phone").addEventListener("click",newFirst)
function newFirst() {
    document.getElementById("phones").innerHTML=""
    mobile.sort((x,y) => new Date(y.date) - new Date(x.date));
    for(var i=0;i<mobile.length;i++) {
        console.log(mobile[i])
        oneCard(i);
    }
    ratingColor();
    wishList();
}


const rangeInput = document.querySelectorAll(".range-input input"),
priceInput = document.querySelectorAll(".price-input input"),
range = document.querySelector(".slider .progress");
let priceGap = 1000;
// priceInput.forEach(input =>{
//     input.addEventListener("input", e =>{
//         let minPrice = parseInt(priceInput[0].value),
//         maxPrice = parseInt(priceInput[1].value);
        
//         if((maxPrice - minPrice >= priceGap) && maxPrice <= rangeInput[1].max){
//             if(e.target.className === "input-min"){
//                 rangeInput[0].value = minPrice;
//                 range.style.left = ((minPrice / rangeInput[0].max) * 100) + "%";
//             }else{
//                 rangeInput[1].value = maxPrice;
//                 range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
//             }
//         }
//     });
// });
rangeInput.forEach(input =>{
    input.addEventListener("input", e =>{
        let minVal = parseInt(rangeInput[0].value),
        maxVal = parseInt(rangeInput[1].value);
        if((maxVal - minVal) < priceGap){
            if(e.target.className === "range-min"){
                rangeInput[0].value = maxVal - priceGap
            }else{
                rangeInput[1].value = minVal + priceGap;
            }
        }else{
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            range.style.left = ((minVal / rangeInput[0].max) * 100) + "%";
            range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
        }
    });
});

// var tep = document.getElementsByClassName("fa-chevron-down")
// // tep.forEach((z) => {z.addEventListener("click",toggleFunction)})
// for(i=0;i<tep.length;i++){
//     tep[i].addEventListener("click",toggleFunction)
// }
// function toggleFunction(){
//     $(this).siblings(".filter-brand").toggle()
//     console.log(this.classList[1]+" ~ .filter-brand", $(".filter-brand"))
// }
// document.querySelector('.filter-brand').classList.add("accordian-toggle")


//for toggling in filter section
// document.querySelector('.togglef').addEventListener('click',function(){
//     document.querySelector('.togglec').classList.toggle("accordian-toggle")
// })

// var add = document.getElementsByClassName("togglef")
// console.log(add)
// var x = document.getElementsByClassName("togglec")
// console.log(x)

// for (i=0;i<add.length;i++){
//     add[i].addEventListener('click',toggleFilter)
// }

// function toggleFilter(){
//     for(var i=0 ;i<x.length;i++){
//         x[i].classList.toggle("accordian-toggle")
//     }
// }





// let tog = document.querySelectorAll('.togglef')
// console.log(tog)
// let x = document.querySelectorAll('.togglec')
// tog.forEach(btns => {
//     btns.addEventListener('click',function(){
//         x.forEach(btn => btn.classList.toggle('accordian-toggle'))
//         // this.classList.toggle('accordian-toggle')
//     })
// })


var filter_toggle = document.getElementsByClassName("accordian-toggle")
console.log(filter_toggle)
for(var i =0; i<filter_toggle.length;i++){
    filter_toggle[i].addEventListener('click',function(){
        var sib = this.nextElementSibling
        console.log(sib)
        if(sib.style.display == 'flex'){
            sib.style.display = 'none'
        }
        else {
            sib.style.display = 'flex'
        }
    })
}