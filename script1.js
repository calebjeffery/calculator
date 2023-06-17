
class Calculator{
    constructor(previousOperandTextElement,expressionTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement
        this.expressionTextElement = expressionTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }
    allClear(){
        this.previousOperand = ''
        this.currentOperand = ''
        this.previousCommandType = ''
        this.currentCommandType = ''
        this.previousOpperation = ''
        this.currentOpperation = ''
        
        this.expression = ''
        this.command = ''
        this.operation = undefined
    }
    clear(){
       
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
            this.currentOperand = this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.compute()
        }
        this.previousOpperation = this.currentOpperation
        this.currentOpperation = operation

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    appendNumberToExpression(number){
        if(number === '.' && this.currentOperand.includes('.')) return
            this.expression = this.expression.toString() + number.toString()
            console.log(`Expression Changed: ${this.expression}`)
    }
    commandPressed(command,type){
        
        console.log(`command: ${command}:${type}`)
        console.log(`previousOpperation: ${this.previousOpperation}`)
        console.log(`currentOpperation: ${this.currentOpperation}`)
        if(this.currentOpperation != '' && type==='NUMBER'){
            this.appendNumberToExpression(number)
        }
        console.log(`expression: ${this.expression}`)
    }
    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
             case '÷':
                 computation = prev / current
                 break
             case '*':
                    computation = prev * current
                    break
             case '+':
                 computation = prev + current
                 break
             case '-':
                 computation = prev - current
                 break
             default:
                 return
        }
        this.currentOperand = computation
        //this.operation = undefined
        this.expression = this.previousOperand
        //this.previousOperand = ''
    }
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay = ''
        } else { 
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits:0})
        }
        if ( decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return `${integerDisplay}`
        }
    }
    updateDisplay(){
        
        if(this.operation != undefined){
        this.expressionTextElement.innerText = `${this.operation} ${this.getDisplayNumber(this.expression)}`
        }else{
            this.expressionTextElement.innerText = `${this.getDisplayNumber(this.expression)}`
        }
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        this.currentOperandTextElement.innerText = `${this.getDisplayNumber(this.currentOperand)}`
        this.previousOperandTextElement.innerText = ''
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const expressionTextElement = document.querySelector('[data-expression]')

const calc = new Calculator(previousOperandTextElement,expressionTextElement,currentOperandTextElement)

allClearButton.addEventListener('click',button=>{
    calc.allClear();
    calc.updateDisplay();
})

deleteButton.addEventListener('click',button=>{
    calc.delete();
    calc.updateDisplay();
})

equalsButton.addEventListener('click',button=>{
    calc.compute();
    calc.updateDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.commandPressed(button.innerText,"NUMBER")
        //calc.appendNumber(button.innerText)
        calc.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.commandPressed(button.innerText,"OPPERATION")
        calc.chooseOperation(button.innerText)
        calc.updateDisplay();
    })
})