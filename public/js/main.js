document.addEventListener("DOMContentLoaded", function () {
    let containerDisplay = document.getElementById("calc_container_display");
    let display = document.getElementById("calc_result");
    let historyDisplay = document.getElementById("history_display");
    let historyModalContent = document.getElementById("history_modal_content");
    let historyContainer = document.getElementById("history_icon");
    let historyModal = document.getElementById("history_modal");
    let buttons = document.getElementById("calc_container_buttons");
    let history = [];

    //Operations
    function calculate() {
        if (checkPercentage()) {
            calculatePercentage();

        } else {
            try {
                let expression = display.innerText;
                let result = eval(display.innerText);
                
                if (Number.isInteger(result)){
                    display.innerText = result;
                    history.push(`${expression} = ${result}`);
                } else {
                    display.innerText = result.toFixed(5);
                    history.push(`${expression} = ${result.toFixed(5)}`);
                }

                updateHistoryDisplay();
                    
            } catch (error) {
                display.innerText = "Error";
            }
        }
    }

    function checkPercentage(){
        let checkChartDisplay = display.innerText;

        for (let i = 0; i < checkChartDisplay.length; i++) {
            if (checkChartDisplay[i] === "%") {
                return true
            }
        }
    }

    //Add Display, remove lastchart and Clear.
    function addToDisplay(value) {
        display.innerText += value;
    }

    function clearDisplay() {
        display.innerText = "";
        historyDisplay.innerText = "";
        history = [];
        updateModalContent();
    }

    function removeLastCharacter() {
        display.innerText = display.innerText.slice(0, -1);
    }

    //Operations Extra
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
        let getDisplay = display.innerText;
        let cutDisplay = getDisplay.split("%");

        let beforePercentage = cutDisplay[0];
        let afterPercentage = cutDisplay[1];

        let percentageValue = (beforePercentage * afterPercentage) / 100;
        let total = `${beforePercentage}%${afterPercentage} = ${percentageValue}`;
        
        display.innerText = percentageValue;
        history.push(total);
        updateHistoryDisplay();
    }

    //Modal 
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

    //Click Buttons and launch funcion
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
                case "√":
                    calculateSquareRoot();
                    break;
                case "π":
                    display.innerText += Math.PI.toFixed(5);
                    break;
                default:
                    addToDisplay(clickedButton);
            }
        }
    });

    //Click anywhere close modal
    document.onclick = function (event) {
        let main = document.getElementById("main")
        if (event.target === containerDisplay || event.target === display || event.target === main) {
            closeHistoryModal();
        } 
    };

    historyContainer.addEventListener("click", openHistoryModal);
});