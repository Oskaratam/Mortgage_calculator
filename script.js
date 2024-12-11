const repaymentOption = document.getElementById("repayment");
const repaymentOptionDiv = document.getElementById("repaymentWrapper");
const interestOption = document.getElementById("interest");
const interestOptionDiv = document.getElementById("interestWrapper"); 



//VISUALS FOR OPTIONS
let changeState = (pickedOption) => {
    console.log(document.querySelectorAll(".pickedOption"));
    document.querySelectorAll(".pickedOption").forEach(node => node.classList.remove("pickedOption"));
    console.log(document.querySelectorAll(".pickedOption"));
    if(pickedOption == "repayment") {
        repaymentOptionDiv.classList.add("pickedOption");
    }else if (pickedOption == "interest") {
        interestOptionDiv.classList.add("pickedOption");
    }
};

repaymentOption.addEventListener("click", () => changeState("repayment"));
interestOption.addEventListener("click", () => changeState("interest"));

//CLEAR ALL BUTTON

document.getElementById("clearBtn").addEventListener("click", () => {
    location.reload();
})


//CALCULATIONS 
const calculateResults = (data) => {
    let totalRepay = 0;
    let amount = parseFloat(data.get("amount"));
        let rate = parseFloat(data.get("rate")) / 100;
        let term = parseInt(data.get("term")) * 12;
    if(data.get("type") == "repayment"){

        let monthlyRate = rate / 12;

        let monthlyRepayment = amount * (monthlyRate * (1 + monthlyRate)**term) / ((1 + monthlyRate)**term - 1);

        totalRepay = monthlyRepayment * term;

        showResults(monthlyRepayment, totalRepay); 
    } else if (data.get("type") == "interest") {
        let monthlyRate = rate / 12;
        let monthlyRepayment = (amount * monthlyRate);
        totalRepay = monthlyRepayment * term;
        showResults(monthlyRepayment, totalRepay); 
    }
    
}


document.getElementById('form').addEventListener("submit", (event) => {
    let isValid = true;
    event.preventDefault();
    let formData = new FormData(event.target);
    let amount = parseFloat(formData.get("amount"));
    let rate = parseFloat(formData.get("rate")) / 100;
    let term = parseInt(formData.get("term"));

    if(isNaN(amount) || amount <= 0){
        document.querySelector(".errorMessageAmount").innerHTML = "Invalid input";
        document.querySelector("#amount").classList.add("errorInput");
        document.querySelector(".input-control > .currencyButton").style.backgroundColor = "red";
        isValid = false;

    } else {
        document.querySelector(".errorMessageAmount").innerHTML = "";
        document.querySelector("#amount").classList.remove("errorInput");
        document.querySelector(".input-control > .currencyButton").style.backgroundColor = "hsl(202, 86%, 94%)";
    }

    if(isNaN(rate) || rate <= 0 || rate > 100 ){
        document.querySelector(".errorMessageRate").innerHTML = "Invalid input";
        document.querySelector("#rate").classList.add("errorInput");
        document.querySelector(".input-control > .rateButton").style.backgroundColor = "red";
        isValid = false;

    } else {
        document.querySelector(".errorMessageRate").innerHTML = "";
        document.querySelector("#rate").classList.remove("errorInput");
        document.querySelector(".input-control > .rateButton").style.backgroundColor = "hsl(202, 86%, 94%)";
    }

    if(isNaN(term) || term <= 0 || term > 50){
        document.querySelector(".errorMessageTerm").innerHTML = "Invalid input. Max term is 50 years";
        document.querySelector("#term").classList.add("errorInput");
        document.querySelector(".input-control > .termButton").style.backgroundColor = "red";
        isValid = false;
    } else {
        document.querySelector(".errorMessageTerm").innerHTML = "";
        document.querySelector("#term").classList.remove("errorInput");
        document.querySelector(".input-control > .termButton").style.backgroundColor = "hsl(202, 86%, 94%)";
    }

    console.log(formData.get("repayement"));
    


    if(isValid){
        calculateResults(formData);
    }    
} )


//DISPLAYING RESULTS
const showResults = (monthly, total) => {
    document.querySelector(".calculatorImage").style.display = "none";
    document.querySelector("h2").innerHTML = "Your results";
    document.querySelector("h2").style.cssText = `
    margin-top: 0;
    margin-bottom: 0.2rem;
    font-size: 1.5rem`;
    document.querySelector("p").style.marginTop = "0";
    document.querySelector("#mainResultText").innerHTML = "";
    document.querySelector("#additionalResultText").innerHTML = "Your results are shown below based on the information you provided.To adjust the results, edit the form and click 'Calculate repayments' again"
    document.querySelector(".resultsWrapper").style.cssText = `
        text-align: left;
        justify-content: normal;
        align-items: normal;
    `
    document.querySelector("#resultDiv").style.display = "inline-block";
    document.querySelectorAll("h3").forEach(el => el.style.display = "inline-block");
    document.getElementById("month-repay-value").innerHTML = monthly.toFixed(2);
    document.getElementById("total-repay-value").innerHTML = total.toFixed(2);
}

