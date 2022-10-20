//Seleção de Elementos
const botoesNumericos = document.querySelectorAll("[data-number]");
const botoesOperacao = document.querySelectorAll("[data-operator]");
const botaoApagar = document.querySelector("[data-delete]");
const botaoLimpar = document.querySelector("[data-clear]")
const botaoIgualdade = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]") 

class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    //adicionando ponto no numero grande
    formatDisplayNumber(number) {
        const stringNumber = number.toString();

        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];

        let integerDisplay;

        if(isNaN(integerDigits)) {
            integerDisplay = "";
        } else {
            integerDisplay = integerDigits.toLocaleString("en", {
                maximumFractionDigits: 0,
            });
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    //chamando a função de deletar uma casa
    delete() {
       this.currentOperand = this.currentOperand.toString().slice(0, -1); 
    }

    //chamando a função de calcular
    calculate() {
        let result;
    
        const _previousOperand = parseFloat(this.previousOperand);
        const _currentOperand = parseFloat(this.currentOperand);
    
        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;
    
        switch (this.operation) {
          case "+":
            result = _previousOperand + _currentOperand;
            break;
          case "-":
            result = _previousOperand - _currentOperand;
            break;
          case "÷":
            result = _previousOperand / _currentOperand;
            break;
          case "x":
            result = _previousOperand * _currentOperand;
            break;
          default:
            return;
        }
    
        this.currentOperand = result;
        this.operation = undefined;
        this.previousOperand = "";
      }

    //atualizando na classe 
    chooseOperation(operation) {
        if (this.currentOperand === "") return;
    
        if (this.previousOperand !== "") {
          this.calculate();
        }
    
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
      }

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;
        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    //chamando função limpar tela
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined; 
    }

    //atualizando na tela
    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
    }
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//função quando clicamos nos números
for (const botaoNumerico of botoesNumericos) {
    botaoNumerico.addEventListener("click", () => {
        calculator.appendNumber(botaoNumerico.innerText);
        calculator.updateDisplay();
    });
}

//função dos operadores
for(const botaoOperacao of botoesOperacao) {
    botaoOperacao.addEventListener("click", () => {
        calculator.chooseOperation(botaoOperacao.innerText)
        calculator.updateDisplay();
    })
}


//função para limpar telas
 botaoLimpar.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
 });

 //função para botão de igual
 botaoIgualdade.addEventListener("click", () => {
    calculator.calculate();
    calculator.updateDisplay();
 })

 //função para botão de apagar 
 botaoApagar.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
 });