
class ParenthesesChecker {
    constructor() {
        // Define Stack class within the constructor
        class Stack {
            constructor() {
                this.items = [];
            }

            push(element) {
                this.items.push(element);
            }

            pop() {
                if (this.isEmpty()) {
                    return "Underflow";
                }
                return this.items.pop();
            }

            peek() {
                return this.items[this.items.length - 1];
            }

            isEmpty() {
                return this.items.length === 0;
            }

            size() {
                return this.items.length;
            }

            clear() {
                this.items = [];
            }
        }

        // Create an instance of Stack
        this.stack = new Stack();
        this.openingBrackets = ['(', '{', '['];
        this.closingBrackets = [')', '}', ']'];
    }
   
    areParenthesesBalanced(str) {
        for (let char of str) {
            if (this.openingBrackets.includes(char)) {
                this.stack.push(char);
            } else if (this.closingBrackets.includes(char)) {
                const lastOpeningBracket = this.stack.pop();
                if (!lastOpeningBracket || this.openingBrackets.indexOf(lastOpeningBracket) !== this.closingBrackets.indexOf(char)) {
                    return false;
                }
            }
        }
        return this.stack.isEmpty();
    }

    findFirstOffendingPosition(str) {
        // You can create a new instance of Stack here if needed
        const stack = new this.stack.constructor();
        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            if (this.openingBrackets.includes(char)) {
                stack.push({ char, position: i });
            } else if (this.closingBrackets.includes(char)) {
                if (stack.isEmpty()) {
                    return i;
                }
                const last = stack.pop();
                if (this.openingBrackets.indexOf(last.char) !== this.closingBrackets.indexOf(char)) {
                    return i;
                }
            }
        }  
        return stack.isEmpty() ? -1 : stack.peek().position;
    }
}

function checkBalanced() {
    const inputString = document.getElementById('inputString').value;
    
    // Check if the input string contains any parentheses
    if (!/[(){}\[\]]/.test(inputString)) {
       displayResult('');
        return;
    }
    const checker = new ParenthesesChecker();
   
    const isBalanced = checker.areParenthesesBalanced(inputString);
    if(isBalanced == true){
        displayResult('');
        return;
    }
    displayResult(
        isBalanced ? 'Parentheses are balanced' :
                     '&#9888; Parentheses are not balanced');
    return isBalanced;
}


function checkOffendingPosition() {
    const inputString = document.getElementById('inputString').value;
    const checker = new ParenthesesChecker();
    const offendingPosition = checker.findFirstOffendingPosition(inputString);
    if (offendingPosition === -1) {
        displayResult('No offending parenthesis found!');
    } else {
        displayResult(`Offending parenthesis found at position ${offendingPosition + 1}`);
    }
}

function displayResult(message) {
  document.querySelector('.result-container').innerHTML =
      `<div class="result">${message}</div>`;
}

setTimeout(function() {
  document.querySelector('.loading-screen').style.display = 'none';
  document.querySelector('.container').style.display = 'block';
}, 7500);  // Change the delay time (in milliseconds) as needed


// code for typing text
const texts = ['Parenthesis Checker', 'Type in your document below'];
let index = 0;
let textIndex = 0;
let isTyping = true;

function typeText() {
  const typingSpan = document.getElementById('typing-text');
  typingSpan.textContent = texts[textIndex].substring(0, index);
  index++;

  if (index > texts[textIndex].length) {
    isTyping = false;
    setTimeout(eraseText, 5000);  // Time before starting to erase text
    return;
  }

  setTimeout(typeText, 100);  // Typing speed (adjust as needed)
}
function changeFont(){
    const font =  document.getElementById('fontSelect').value;
    const text = document.getElementById('inputString');
    text.style.fontFamily = font;
 }
function eraseText() {
  const typingSpan = document.getElementById('typing-text');
  typingSpan.textContent = texts[textIndex].substring(0, index);
  index--;

  if (index === 0) {
    isTyping = true;
    textIndex = (textIndex + 1) % texts.length;  // Move to the next text
    setTimeout(typeText, 1000);  // Time before starting to type next text
    return;
  }

  setTimeout(eraseText, 100);  // Erasing speed (adjust as needed)
}


function generateRandomString() {
    const tests = [
        "Programming languages rely on balanced parentheses for proper syntax (it's crucial).",
        "Balanced parentheses make code readable and maintainable (like a well-structured sentence.",
        "Unbalanced parentheses can cause syntax errors (which are frustrating to debug.",
        "Sometimes it's hard to keep track of nested parentheses (especially in complex algorithms.",
        "Always remember to close your parentheses (and brackets and curly braces)!",
        "Balanced parentheses are like a well-structured sentence (clear and concise.",
        "Unbalanced parentheses are like unfinished thoughts (confusing and frustrating.",
        "Balancing parentheses is a fundamental skill in programming (master it!).",
        "Nested parentheses can lead to complex code (but they're necessary sometimes).",
        "In mathematics, parentheses denote the order of operations (PEMDAS.",
        "Balanced parentheses are a sign of organized code (and an organized mind).",
        "Functions often require balanced parentheses to be properly executed (a syntax requirement.",
        "Expressions enclosed in parentheses are evaluated first (it's a precedence rule).",
        "Unbalanced parentheses can derail an entire program (a single missing parenthesis can wreak havoc).",
        "Nested parentheses can be visualized as layers of an onion (peeling them off one by one).",
        "Balancing parentheses is like solving a puzzle (fitting the pieces together.",
        "Programming without balanced parentheses is like driving without a steering wheel (you'll crash).",
        "Regular expressions often involve nested parentheses (for capturing groups.",
        "Balanced parentheses indicate clarity in code (they help other developers understand your intentions).",
        "Error messages related to unbalanced parentheses can be cryptic (take care to avoid them.",
        "Sometimes we forget to close parentheses (and that can lead to syntax errors.",
        "Unbalanced parentheses can make code difficult to read (and even more difficult to debug.",
        "Nested parentheses create complexity in code (it's like a maze sometimes.",
        "Forgetting to close parentheses is a common mistake in programming (but easily fixable.",
        "Balanced parentheses are the key to well-structured code (it's like the foundation of a building.",
    ];
    const sentences = tests;
    const randomIndex = Math.floor(Math.random() * sentences.length);
    document.getElementById('inputString').value = sentences[randomIndex];
    checkBalanced();
}

const clearText = () => {
    document.getElementById('inputString').value = '';
    displayResult('');
}
typeText();  // Start typing when the page loads

