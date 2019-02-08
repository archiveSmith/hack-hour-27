/* Write a function that console logs a staircase of any given height where 1 <= N <= 100.
 The staircase must climb up from left to right. The last line should only consist of asterisks,
 without any leading/trailing spaces.
 
 For example:     
 drawStairs(6) ->          
     *
    **
   ***
  ****
 *****
******

*/

function drawStairs(n) {
    let stairs = 1;
    let spaces = n - 1;
    while (spaces >= 0) {
        console.log(" ".repeat(spaces) + ("*").repeat(stairs))
        stairs+=1;
        spaces-=1;
    }
}

module.exports = drawStairs;

drawStairs(5)