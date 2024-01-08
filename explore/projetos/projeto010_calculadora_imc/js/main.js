import { Modal } from "./modal.js";
import { Alert } from "./alert.js";
// import { ValidateInputs } from "./input.js";

let form = document.querySelector("#form");
let calculateBtn = document.querySelector("#calculateBtn");
let weight = document.querySelector("#weight");
let height = document.querySelector("#height");
let message = document.querySelector("#message");
let closeAlertBtn = document.querySelector("#closeAlert");

function calcImc(weight, height){
    if(ValidateInputs(weight, height)){
        let imc = (weight / (height ** 2)).toFixed(2);
        
        imcResult.textContent = imc;

        return Modal.open();
    }
}

function ValidateInputs(weight, height){
    if(!weight || !height){
        message.textContent = "Preencha  todos os campos";
        
        Alert.open();
        return false; 
    }
    
    Alert.close();
    return true;
}

calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    calcImc(weight.value, height.value);
})

closeAlertBtn.addEventListener("click", () => Alert.close())

closeModal.addEventListener("click", () => Modal.close());

form.addEventListener("keydown", () => Alert.close())