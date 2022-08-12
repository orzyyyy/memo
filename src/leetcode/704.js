// @algorithm @lc id=792 lang=javascript
// @title binary-search
import * as a from 'algm';
// @test([-1,0,3,5,9,12],9)=4
// @test([-1,0,3,5,9,12],2)=-1
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  // index 用于记录数组分割后 target 索引所在范围
  return halfAl({ nums, target, index: 0 });
};

var halfAl = function ({ nums, target, index }) {
  const length = nums.length;
  if (length === 1) {
    if (target !== nums[0]) {
      return -1;
    }
    return index;
  }
  let centerIndex;
  if (length % 2 === 1) {
    centerIndex = (length + 1) / 2;
  } else {
    centerIndex = length / 2;
  }
  const center = nums[centerIndex];
  if (target === center) {
    return halfAl({ nums: [target], target, index: centerIndex + index });
  } else if (target > center) {
    return halfAl({ nums: nums.slice(centerIndex, length), target, index: centerIndex + index });
  } else if (target < center) {
    return halfAl({ nums: nums.slice(0, centerIndex), target, index });
  }
};
