/* You are given an array of integers with both positive and negative numbers. Write a function to
 * find the maximum sum of all subarrays. A subarray is a section of consecutive elements from the
 * original array. The whole array can be considered a sub array of itself.
 *
 * For example: maxSubarray([1, -2, 3, 10, -4, 7, 2, -5]) -> 18 from [3, 10, -4, 7, 2]
 *              maxSubarray([15,20,-5,10])  -> 40
 *
 */

function maxSubarray(arr) {
  let answer = 0;
  let sum = 0;
  for(let i = 0; i < arr.length; i += 1) {
    answer = Math.max(0, answer + arr[i])
    sum = Math.max(answer, sum)
  }
  return sum
}

console.log(maxSubarray([1, -2, 3, 10, -4, 7, 2, -5]))

// module.exports = maxSubarray;
