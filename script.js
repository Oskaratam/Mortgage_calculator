const repaymentOption = document.getElementById("repayment");
const repaymentOptionDiv = document.getElementById("repaymentWrapper");
const interestOption = document.getElementById("interest");
const interestOptionDiv = document.getElementById("interestWrapper"); 



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

const calculateResults = (data) => {
    let totalRepay = 0;
    if(data.get("type") == "repayment"){
        let amount = parseFloat(data.get("amount"));
        let rate = parseFloat(data.get("rate")) / 100;
        let term = parseInt(data.get("term")) * 12;

        let monthlyRate = rate / 12;

        let monthlyRepayment = amount * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);

        totalRepay = monthlyRepayment * 300;

        showResults(monthlyRepayment, totalRepay);
        
    }
    
}


document.getElementById('form').addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = new FormData(event.target);
    calculateResults(formData);
    
} )



const showResults = (monthly, total) => {
    document.querySelector(".calculatorImage").style.display = "none";
    document.querySelector("h2").innerHTML = "Your results";
    document.querySelector("h2").style.cssText = `
    margin-top: 0;
    margin-bottom: 0.2rem;
    font-size: 1.5rem`;
    document.querySelector("p").style.marginTop = "0";
    document.querySelector("p").innerHTML = "";
    document.querySelector(".resultsWrapper").style.cssText = `
        text-align: left;
        justify-content: normal;
        align-items: normal;
    `
    document.querySelector("#resultDiv").style.display = "inline-block";
    document.querySelectorAll("h3").forEach(el => el.style.display = "inline-block");
    document.getElementById("month-repay-value").innerHTML = monthly;
    document.getElementById("total-repay-value").innerHTML = total;
}

