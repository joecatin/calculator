let displayValue = "0";
let formula = "";
const firstCharacterRegex = /^./g;
const lastCharacterRegex = /.$/g;
const digitRegex = /\d+/g;
const divideByZeroRegex = /\/0/g;
let firstCharacterString = "";
let result = "";
let key;


const checkTooLong = (text) => {
    if (text.length >= 12){
        result = "large number..."
        document.getElementById("display").textContent = result;
        return true
    }    
    return false
}

const display = (e) => {

    key = findButton(e);

    if (!key) return;
    key.classList.add("pressed");
    checkTooLong(displayValue);

    if (displayValue == 0) displayValue = key.textContent;
    else displayValue = displayValue + key.textContent;
    document.getElementById("display").textContent = displayValue;
}

const findButton = (e) => {
    
    if (e.type == "keydown") {
        if (e.keyCode == "13"){
            calculate(e);
            return
        } else {
            key = document.querySelector(`.button[data-key="${e.keyCode}"]`);
        }
    } else {
        key = e.currentTarget;
    }

    return key;
}

const clear = () => {
    displayValue = "0";
    operator = "";
    result = "";
    document.getElementById("display").textContent = displayValue;
}

const operate = (formula) => {
    const func = new Function("return " + formula);
    return func();
}

const getResult = () => {

    formula = displayValue.replace("x", "*");

    if (divideByZeroRegex.test(formula)) result = "Nope!";
    else result = operate(formula);
    
    return Math.round(result * 100) / 100;
}

const calculate = () => {
    result = getResult();
    if (!checkTooLong(result)){
        displayValue = result.toString();
        document.getElementById("display").textContent = result;
    }    
}

const changeSign = () => {
    firstCharacterString = displayValue.match(firstCharacterRegex)[0];
    if (firstCharacterString == "-") {
        displayValue = displayValue.replace(firstCharacterRegex, "");
    } else {
        displayValue = "-" + displayValue
    }
    document.getElementById("display").textContent = displayValue;
}

const deleteLast = () => {
    if (displayValue.length == 1){
        displayValue = "0";
    } else {
        displayValue = displayValue.replace(lastCharacterRegex, "");
    }    
    document.getElementById("display").textContent = displayValue;
}

// transition = (e) => {
//     const key = document.querySelector(`.button[data-key="${e.keyCode}"]`);

//     if (!key) return;
//     key.classList.add(("pressed"));
//     key.target.textContent = key.textContent;
// }


const operationButtons = document.querySelectorAll(".number, .operator"); 
operationButtons.forEach(button => button.addEventListener("click", display));

const plusminus = document.getElementById("plusminus"); 
plusminus.addEventListener("click", changeSign);

const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", calculate);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

const backButton = document.getElementById("back");
backButton.addEventListener("click", deleteLast);

window.addEventListener("keydown", display);

const removeTransition = (key) => { key.classList.remove(("pressed")); }
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("transitionend", function(e){ removeTransition(this) })
});




// isolate high priority operation
// -> match digit(s) followed a high priority operator followed by digit(s) or high priority operator.