class Calculator {

    constructor(calculator) {
        this.calculator = $('[data-calculator]');
        console.log(this.checkboxes);
    }

    checkboxes = this.calculator.find('.calc-checkbox');

}