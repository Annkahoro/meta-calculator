class Calculator {
    constructor() {
        this.input = document.getElementById('input');
        this.result = document.getElementById('result');
    }

    appendToInput(value) {
        this.input.value += value;
    }

    clearInput() {
        this.input.value = '';
        this.result.textContent = '';
    }

    calculate() {
        try {
            const expression = this.input.value;
            const calculationResult = eval(expression); // Note: eval is used for simplicity, not recommended for production
            this.result.textContent = `Result: ${calculationResult}`;
        } catch (error) {
            this.result.textContent = 'Error: Invalid expression';
        }
    }

    calculateStat(operation) {
        const numbers = this.input.value.split(',').map(num => parseFloat(num.trim())).filter(num => !isNaN(num));
        
        if (numbers.length === 0) {
            this.result.textContent = 'Error: No valid numbers';
            return;
        }

        let calculationResult;
        switch (operation) {
            case 'mean':
                calculationResult = this.mean(numbers);
                break;
            case 'median':
                calculationResult = this.median(numbers);
                break;
            case 'mode':
                calculationResult = this.mode(numbers);
                break;
            case 'variance':
                calculationResult = this.variance(numbers);
                break;
            case 'stdDev':
                calculationResult = this.stdDev(numbers);
                break;
        }

        this.result.textContent = `${operation.charAt(0).toUpperCase() + operation.slice(1)}: ${calculationResult}`;
    }

    mean(numbers) {
        return numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    }

    median(numbers) {
        const sorted = [...numbers].sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[middle - 1] + sorted[middle]) / 2
            : sorted[middle];
    }

    mode(numbers) {
        const frequency = {};
        numbers.forEach(num => {
            frequency[num] = (frequency[num] || 0) + 1;
        });
        const maxFrequency = Math.max(...Object.values(frequency));
        return Object.keys(frequency)
            .filter(num => frequency[num] === maxFrequency)
            .map(num => parseFloat(num))
            .join(', ');
    }

    variance(numbers) {
        const avg = this.mean(numbers);
        return numbers.reduce((sum, num) => sum + Math.pow(num - avg, 2), 0) / numbers.length;
    }

    stdDev(numbers) {
        return Math.sqrt(this.variance(numbers));
    }
}

const calc = new Calculator();

// Global functions to be used by HTML buttons
function appendToInput(value) {
    calc.appendToInput(value);
}

function clearInput() {
    calc.clearInput();
}

function calculate() {
    calc.calculate();
}

function calculateStat(operation) {
    calc.calculateStat(operation);
}