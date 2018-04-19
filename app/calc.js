var calcSum = function (arr) {
  var sum = 0;

  arr.forEach(function (el, ind) {
    console.log('index', ind);
    console.log('el', el);
    sum += el;
  });

  return sum;
};

module.exports = {
  calcSum: calcSum
};

// module.exports.calcSum = calcSum;

/*module.exports = function (params) {
  var calcSum = ...
  return ...
}*/
