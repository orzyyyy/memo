// @algorithm @lc id=15 lang=javascript
// @title 3sum
import * as a from 'algm';
// @test([-1,0,1,2,-1,-4])=[[-1,-1,2],[-1,0,1]]
// @test([])=[]
// @test([0])=[]
// @test([0,0,0,0])=[[0,0,0]]
// @test([-1,0,1,0])=[[-1,0,1]]
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  if (nums.length < 3) {
    return [];
  }
  if (nums.every((item) => item === 0)) {
    return [[0, 0, 0]];
  }
  nums.sort((a, b) => a - b);
  var result = [];
  for (var i = 0; i < nums.length - 2 && nums[i] <= 0; i++) {
    var first = nums[i];
    for (var j = i + 1; j < nums.length - 1; j++) {
      var second = nums[j];
      for (var k = j + 1; k < nums.length; k++) {
        var third = nums[k];
        if (first + second + third === 0) {
          result.push([first, second, third]);
        }
      }
    }
  }
  var resultSet = new Set();
  for (const item of result) {
    const key = `${item[0]},${item[1]},${item[2]}`;
    resultSet.add(key, item);
  }
  result = [];
  resultSet.forEach((item) => {
    const resultItem = item.split(',').map((jtem) => parseInt(jtem));
    result.push(resultItem);
  });
  return result;
};
