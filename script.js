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