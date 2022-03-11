/**
 * @param {number} x
 * @return {boolean}
 * https://leetcode-cn.com/problems/palindrome-number/
 */
var isPalindrome = function (x) {
  if (x > Math.pow(2, 31) || x < -Math.pow(2, 31)) {
    return false;
  }
  var reverseResult = reverseStr(x);
  if (reverseResult.includes('-')) {
    return false;
  }
  if (reverseResult.length > 1 && reverseResult[0] === '0') {
    return false;
  }
  if (reverseResult.length === 1) {
    return true;
  }
  return reverseResult === x + '';
};

var reverseStr = function (x) {
  return (x + '').split('').reverse().join('');
};
