document.addEventListener("DOMContentLoaded", function () {
    let display = document.getElementById("calc_result");
    let historyDisplay = document.getElementById("history_display");
    let historyModalContent = document.getElementById("history_modal_content");
    let historyContainer = document.getElementById("history_icon");
    let historyModal = document.getElementById("history_modal");
    let buttons = document.getElementById("calc_container_buttons");
    let history = [];

    // Funciones
    function addToDisplay(value) {
        display.innerText += value;
    }

    function clearDisplay() {
        display.innerText = "";
        historyDisplay.innerText = "";
        history = [];
    }

    function removeLastCharacter() {
        display.innerText = display.innerText.slice(0, -1);
    }

    function calculate() {
        try {
            let expression = display.innerText;
            let result = eval(display.innerText);
            display.innerText = result;
            history.push(`${expression} = ${result}`);
            updateHistoryDisplay();
        } catch (error) {
            display.innerText = "Error";
        }
    }

    function calculateSquareRoot() {
        if (display.innerText.length == 0) {
            display.innerText = "Error : √0 es Null"
        } else {
            try {
                let result = Math.sqrt(eval(display.innerText));
                display.innerText = result;
                history.push(`√(${display.innerText})`);
                updateHistoryDisplay();
            } catch (error) {
                display.innerText = "Error";
            }
        }
    }

    function calculatePercentage() {
        try {
            let result = (display.innerText) / 100;
            display.innerText = result;
            history.push(`${display.innerText}%`);
            updateHistoryDisplay();
        } catch (error) {
            display.innerText = "Error";
        }
    }

    function updateHistoryDisplay() {
        if (history.length > 0) {
            historyDisplay.innerText = history[history.length - 1];
        } else {
            historyDisplay.innerText = "";
        }

        updateModalContent();
    }

    function updateModalContent() {
        historyModalContent.innerHTML = "";
        history.forEach((operation) => {
            let operationElement = document.createElement("div");
            operationElement.innerHTML = operation;
            historyModalContent.appendChild(operationElement);
        });
    }

    function openHistoryModal() {
        historyModal.style.display = "block";
    }

    function closeHistoryModal() {
        historyModal.style.display = "none";
    }


    buttons.addEventListener("click", function (event) {
        if (event.target.value !== undefined) {
            let clickedButton = event.target.value;

            switch (clickedButton) {
                case "C":
                    clearDisplay();
                    break;
                case "←":
                    removeLastCharacter();
                    break;
                case "=":
                    calculate();
                    break;
                case "%":
                    calculatePercentage();
                    break;
                case "√":
                    calculateSquareRoot();
                    break;
                case "π":
                    display.innerText += Math.PI.toFixed(10);
                    break;
                default:
                    addToDisplay(clickedButton);
            }
        }
    });

    historyContainer.addEventListener("click", openHistoryModal);


    document.onclick = function (event) {
        if (event.target === historyModal || event.target === display) {
            closeHistoryModal();
        }
    };

});