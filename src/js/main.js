/**
 * Created by trond on 16.04.2016.
 */

console.log('foobar');

class Salaries {
    constructor() {
        this.monthly = {
            male: 43100,
            female: 37900
        };
        const daysInYear = this.isLeapYear() ? 366 : 365;
        const secondsInYear = 60 * 60 * 24 * daysInYear;
        this.pps = {
            male: (this.monthly.male * 12) / secondsInYear,
            female: (this.monthly.female * 12) / secondsInYear
        };
        this.yearStart = new Date(new Date().getFullYear(), 0, 1);

        this.elements = {
            male: document.getElementById('male-salary'),
            female: document.getElementById('female-salary')
        };
        this.calculateWages();
        setInterval(this.calculateWages.bind(this), 1000);
    }
    calculateWages() {
        const secondsSinceYearStart = (new Date().getTime() - this.yearStart.getTime())/1000;

        const maleSalary = this.pps.male * secondsSinceYearStart;
        const femaleSalary = this.pps.female * secondsSinceYearStart;

        this.elements.male.innerHTML = this.formatCurrency(maleSalary);
        this.elements.female.innerHTML = this.formatCurrency(femaleSalary);

    }
    isLeapYear() {
        const year = new Date().getFullYear();
        if((year & 3) != 0) return false;
        return ((year % 100) != 0 || (year % 400) == 0);
    }
    formatCurrency(n) {
        const amount = n.toFixed(2);
        const integer = amount.toString().split('.')[0];
        const decimal = amount.toString().split('.')[1];

        const ret = integer.split('').reverse().reduce((acc, curr, index) => {
            return index % 3 === 0 && index !== 0 ? acc + ' ' + curr : acc + curr;
        }, '');


        return 'NOK ' + ret.split('').reverse().join('') + ',' + decimal;
    }
}

new Salaries();