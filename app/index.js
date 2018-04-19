var calc = require('./calc');
var calcMethod = calc.calcSum; // calc['calcSum']

var testArray = [1, 2, 3];

var result = calcMethod(testArray);

console.log(result);

