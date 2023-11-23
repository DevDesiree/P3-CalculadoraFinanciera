document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById("calc_result");
    let buttons = document.getElementById("calc_container_buttons");
    let history = [];

    function addToDisplay(value) {
        display.innerText += value;

    }

    function calculate() {
        try {
            let expression = display.innerText;
            let result = eval(display.innerText);
            display.innerText = result;
            history.push(`${expression} = ${result}`);
            
        } catch (error) {
            display.innerText = "Error";
        }
    }


    buttons.addEventListener("click", function (event) {
        if (event.target.value !== undefined) {
            let clickedButton = event.target.value;

            switch (clickedButton) {
                case "=":
                    calculate();
                    break;
                default:
                    addToDisplay(clickedButton);
            }
        }
    });


});