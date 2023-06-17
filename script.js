
class Calculator{
    constructor(registerTextElement,registerATextElement,registerBTextElement,resultTextElement,opperationTextElement){
        this.registerTextElement = registerTextElement
        this.registerATextElement = registerATextElement
        this.registerBTextElement = registerBTextElement
        this.resultTextElement = resultTextElement
        this.opperationTextElement = opperationTextElement
        this.allClear()
    }
    allClear(){
        this.register=''
        this.registerA = ''
        this.registerB = ''       
        this.result = ''
        this.operation=undefined
    }
    clear(){
        this.register=''
        this.result = ''
        this.operation=undefined
    }
    delete(){
        this.register = this.register.toString().slice(0,-1)
    }
    appendNumber(number){
        //if(this.register === '' && this.operation!= undefined){
        //    this.operation = undefined
       // }
        if(number === '.' && this.register.includes('.')) return
            this.register = this.register.toString() + number.toString()
    }
    chooseOperation(operation){
        if(this.operation == undefined){
            this.registerA = this.register
            this.register = ''
        }
        if(this.registerA != ''){
            this.registerB = this.register
            this.register = ''
        }
        if(this.registerA != '' && this.operation != undefined){
            this.compute()
        }
        this.operation = operation
        console.log("CHANGED OPERATOR: "+this.operation)
    }
    
    commandPressed(command,type){
    }
    compute(){
        
        console.log("COMPUTING "+this.operation)
        const floatRegisterA = parseFloat(this.registerA)
        let floatRegisterB = parseFloat(this.registerB)
        let floatRegister = parseFloat(this.register)
        console.log("floatRegisterA: "+floatRegisterA)
        console.log("floatRegisterB: "+floatRegisterB)
        let computation = floatRegisterA
        if(this.operation == undefined) return
        if(isNaN(floatRegisterB) || !isNaN(floatRegister)) {
            this.registerB = this.register
            this.register = ''
            floatRegisterB = floatRegister
        }
        if(isNaN(floatRegisterA) || isNaN(floatRegisterB)) return
        console.log(floatRegisterA +" "+this.operation+" "+floatRegisterB)
        switch(this.operation) {
            case '÷':
                computation = floatRegisterA / floatRegisterB
                break
            case '*':
                   computation = floatRegisterA * floatRegisterB
                   break
            case '+':
                computation = floatRegisterA + floatRegisterB
                break
            case '-':
                computation = floatRegisterA - floatRegisterB
                break
            default:
                return
       }
        this.registerA = computation
        this.result = computation
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
        this.registerTextElement.innerText  = this.register
        this.registerATextElement.innerText  = this.registerA
        this.registerBTextElement.innerText = this.registerB
        this.resultTextElement.innerText = this.result
        if(this.operation != undefined){
            this.opperationTextElement.innerText = this.operation
        }else{
            this.opperationTextElement.innerText = '';
        }
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const registerTextElement = document.querySelector('[data-REGISTER]')
const registerATextElement = document.querySelector('[data-REGISTERA]')
const registerBTextElement = document.querySelector('[data-REGISTERB]')
const resultTextElement = document.querySelector('[data-RESULT]')
const opperationTextElement = document.querySelector('[data-symbol]')

const calc = new Calculator(registerTextElement,registerATextElement,registerBTextElement,resultTextElement,opperationTextElement)

allClearButton.addEventListener('click',button=>{
    calc.allClear();
    calc.updateDisplay();
})
clearButton.addEventListener('click',button=>{
    calc.clear();
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
        calc.appendNumber(button.innerText)
        calc.updateDisplay();
    })
})

document.addEventListener('keyup', (e) => {
    console.log("NUMBER PRESSED:"+e.code);
        let key = e.code.toUpperCase()
        if(key==="BACKSPACE"){
            calc.delete()
            calc.updateDisplay();
            return    
        }
        if(key.startsWith('NUMPAD')){
            console.log("NUMBER FOUND:"+e.code);
            key = key.replace('NUMPAD','')
            integerDigit = parseInt(key)
            if(isNaN(integerDigit)){
                if(key==="ENTER"){
                    calc.compute()
                    calc.updateDisplay();    
                }
                
                if(key==="DECIMAL"){
                    key = '.'
                    calc.appendNumber(key)
                    calc.updateDisplay();    
                }
                if(key==="DIVIDE"){
                    key = '÷'
                    calc.chooseOperation(key)
                    calc.updateDisplay();    
                }
                if(key==="MULTIPLY"){
                    key = '*'
                    calc.chooseOperation(key)
                    calc.updateDisplay();    
                }
                if(key==="SUBTRACT"){
                    key = '-'
                    calc.chooseOperation(key)
                    calc.updateDisplay();    
                }
                if(key==="ADD"){
                    key = '+'
                    calc.chooseOperation(key)
                    calc.updateDisplay();    
                }
            }else{
                calc.appendNumber(key)
                calc.updateDisplay();   
            }
                         
        }
        if(key.startsWith('DIGIT')){   
            console.log("DIGIT FOUND:"+e.code);
            key = key.replace('DIGIT')
            integerDigit = parseInt(key)
            if(!isNaN(integerDigit)){
                calc.appendNumber(key)
                calc.updateDisplay();  
            }
        }
        
})


operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calc.chooseOperation(button.innerText)
        calc.updateDisplay();
    })
})

