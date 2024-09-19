const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
const updateFlag = (element) => {
    let currCode = element.value;
    let countrycode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

const btn = document.querySelector("form button");

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        select.append(newOption);
        if(select.name == "from" && currcode == "USD"){
            newOption.selected = "selected";
        } else if(select.name == "to" && currcode == "INR"){
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
}

btn.addEventListener("click", async(evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval <1){
        amount.value = "1";
    }
    const url = `${base_url}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    let rate = data[toCurr.value.toLowerCase()];
    let finalamt = amtval*rate;
    
    msg.innerText = `${amtval} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
})






