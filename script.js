let displayValue = "0";
let formula = "";
const firstCharacterRegex = /^./g;
const lastCharacterRegex = /.$/g;
const digitRegex = /\d+/g;
const divideByZeroRegex = /\/0/g;
// const wrongOperatorsRegex = /(?<=[\d]|^)[+\-*\/]+/g;
let wrongOperatorsRegex = /(^[-+x/])|([-+x/]{2,})/g;
let lastCharacterString = "";
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

const isWrongOperators = (text) => {
    return text.match(wrongOperatorsRegex);
}

const display = (e) => {

    key = transition(e);
    if (!key) return;
    checkTooLong(displayValue);

    if (displayValue == 0) {
        displayValue = key.textContent;
        if (isWrongOperators(displayValue)) displayValue = 0;
    } else {
        if (! isWrongOperators(displayValue + key.textContent)) {
            displayValue = displayValue + key.textContent;
        }        
    };

    document.getElementById("display").textContent = displayValue;

    return true;
}

const transition = (e) => {
    
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

    if (!key) return;
    key.classList.add("pressed");
    return key;
}

const clear = () => {
    displayValue = "0";
    operator = "";
    result = "";
    document.getElementById("display").textContent = displayValue;

    return true;
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

    return true;
}

const changeSign = () => {
    firstCharacterString = displayValue.match(firstCharacterRegex)[0];
    if (firstCharacterString == "-") {
        displayValue = displayValue.replace(firstCharacterRegex, "");
    } else {
        displayValue = "-" + displayValue
    }
    document.getElementById("display").textContent = displayValue;

    return true;
}

const deleteLast = () => {
    if (displayValue.length == 1){
        displayValue = "0";
    } else {
        displayValue = displayValue.replace(lastCharacterRegex, "");
    }    
    document.getElementById("display").textContent = displayValue;

    return true;
}

const operationButtons = document.querySelectorAll(".number, .operator"); 
operationButtons.forEach(button => button.addEventListener("click", display));

const plusminus = document.getElementById("plusminus"); 
plusminus.addEventListener("click", (e) => {
    transition(e); changeSign(e);
});

const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", (e) => {
    transition(e); calculate(e);
});

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", (e) => {
    transition(e); clear(e);
});

const backButton = document.getElementById("back");
backButton.addEventListener("click", (e) => {
    transition(e); deleteLast(e);
});
window.addEventListener("keydown", display);

const removeTransition = (key) => { key.classList.remove("pressed"); }
const buttons = document.querySelectorAll(".button");
buttons.forEach(button => {
    button.addEventListener("transitionend", function(e){ removeTransition(this) })
});
