/**
 *  I have an array stock_prices_yesterday where:
 *
 *    - The indices are the time in minutes past trade opening time, which was 9:30am local time
 *    - The values are the prices in dollars of Apple stock at the time
 *
 *  For example, the stock cost $500 at 10:30am, so stock_prices_yesterday[60] = 500;
 *
 *  Write an efficient algorithm for computing the best profit I could have made from 1 purchase
 *  and 1 sale of 1 Apple stock yesterday
 *
 *  Return 0 if no profit is possible OR if input is invalid.
 */

function bestProfit(stock_prices_yesterday) {
    let arr = stock_prices_yesterday;
    if(arr.length < 1) return 0;

    let high = arr[0];
    let low = arr[1];

    for(let i = 0; i < arr.length; i++){
        high = Math.max(high, arr[i]);
        low = Math.min(low, arr[i]);
    }

    let profit = high - low;
    return (high - low < 0) ? 0 : high-low;
}

module.exports = bestProfit;
