let displayValue = "0";
let operator = "";
const operators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "x": (x, y) => x * y,
    "/": (x, y) => x / y,
};
const possibleOperators = Object.keys(operators);
const operatorsRegex = /(?<!^)[+\-x\/]/g;
// const lowPriorityOperatorsRegex = /(?<=[^x\/])\d+[+\-]\d+(?=[x\/])/g;
const lowPriorityOperatorsRegex = /(?<=[^x\/])\d+[+\-]\d+(?=[x\/])/g;
const highPriorityOperatorsRegex = /(?<=[^+\-])\d+[x\/]\d+(?=[$+\-])/g;
const firstCharacterRegex = /^./g;
const lastCharacterRegex = /.$/g;
const divideByZeroRegex = /\/0/g;
let firstCharacterString = "";
let result = "";
let operands;



const display = (e) => {

    if (!result == "") clear();

    if (displayValue == 0) displayValue = e.target.textContent;
    else displayValue = displayValue + e.target.textContent;
    document.getElementById("display").textContent = displayValue;

    // endOfdisplayString = displayValue.match(endOfdisplayRegex)[0];

    // if (! (possibleOperators.includes(endOfdisplayString))){
    //     if (displayValue == 0) displayValue = e.target.textContent;
    //     else displayValue = displayValue + e.target.textContent;
    //     document.getElementById("display").textContent = displayValue;
    // }

    // if (! result == "") clear();

    // if (possibleOperators.includes(operator)) {
    //     result = operate(operator, displayValue, e.target.textContent)
    //     document.getElementById("display").textContent = result;
    // } else {
    //     endOfdisplayString = displayValue.match(endOfdisplayRegex)[0];

    //     if (! (possibleOperators.includes(endOfdisplayString))){
    //         if (displayValue == 0) displayValue = e.target.textContent;
    //         else displayValue = displayValue + e.target.textContent;
    //         document.getElementById("display").textContent = displayValue;
    //     }
    // }
}

const clear = () => {
    displayValue = "0";
    operator = "";
    result = "";
    document.getElementById("display").textContent = displayValue;
}

const operate = (operator, x, y) => {
    return operator(x, y);
}

const getResult = () => {

    if (divideByZeroRegex.test(displayValue)){
        result = "Nope!"
        document.getElementById("display").textContent = result;
    }

    operations = displayValue.split(lowPriorityOperatorsRegex);

}

const process = () => {
    getResult();
    operands = displayValue.split(operatorsRegex);
    // result = operate(operators[operator], +operands[0], +operands[1]);
    // result = `${Math.round(result * 100) / 100}`;
    // if (result.length > 12) result = "very big number";
    // document.getElementById("display").textContent = result;
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
    displayValue = displayValue.replace(lastCharacterRegex, "");
    document.getElementById("display").textContent = displayValue;
}

const numbers = document.querySelectorAll(".number"); 
numbers.forEach(number => number.addEventListener("click", display));

const plusminus = document.getElementById("plusminus"); 
plusminus.addEventListener("click", changeSign);

const operatorButtons = document.querySelectorAll(".operator"); 
operatorButtons.forEach(button => button.addEventListener("click", (e) => {
    if (!result == "") clear();
    operator = e.target.textContent;
    display(e)
}));

const equalButton = document.getElementById("equal");
equalButton.addEventListener("click", process);

const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clear);

const backButton = document.getElementById("back");
backButton.addEventListener("click", deleteLast);







// isolate high priority operation
// -> match digit(s) followed a high priority operator followed by digit(s) or high priority operator.