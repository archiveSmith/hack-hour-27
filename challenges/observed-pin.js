/*
Alright, detective, one of our colleagues successfully observed our target person, Robby the robber. 
We followed him to a secret warehouse, where we assume to find all the stolen stuff. The door to 
this warehouse is secured by an electronic combination lock. Unfortunately our spy isn't sure about the 
PIN he saw, when Robby entered it.

The keypad has the following layout:

┌───┬───┬───┐
│ 1 │ 2 │ 3 │
├───┼───┼───┤
│ 4 │ 5 │ 6 │
├───┼───┼───┤
│ 7 │ 8 │ 9 │
└───┼───┼───┘
    │ 0 │
    └───┘
He noted the PIN 1357, but he also said, it is possible that each of the digits he saw could actually 
be another adjacent digit (horizontally or vertically, but not diagonally). E.g. instead of the 1 it 
could also be the 2 or 4. And instead of the 5 it could also be the 2, 4, 6 or 8.

He also mentioned, he knows this kind of locks. You can enter an unlimited amount of wrong PINs, they 
never finally lock the system or sound the alarm. That's why we can try out all possible (*) variations.

* possible in sense of: the observed PIN itself and all variations considering the adjacent digits

Can you help us to find all those variations? It would be nice to have a function, that returns an array 
of all variations for an observed PIN with a length of 1 to 8 digits. We could name the function getPINs. 
But please note that all PINs, the observed one and also the results, must be strings, because of  
potentially leading '0's. Don't worry about the order of the array.

Detective, we count on you!

expectations = {
  "8": ["5", "7", "8", "9", "0"],
  "11": ["11", "22", "44", "12", "21", "14", "41", "24", "42"],
  "369": ["339","366","399","658","636","258","268","669","668","266","369","398","256","296","259","368","638","396","238","356","659","639","666","359","336","299","338","696","269","358","656","698","699","298","236","239"],
}

*/

let pad = {
	"1": ['1', '2', '4'],
	"2": ['1', '2', '3', '5'],
	"3": ['2', '3', '6'],
	"4": ['1', '4', '5', '7'],
	"5": ['2', '4', '5', '6', '8'],
	"6": ['3', '5', '6', '9'],
	"7": ['4', '7', '8'],
	"8": ['5', '7', '8', '9', '0'],
	"9": ['6', '8', '9'],
	"0": ['8', '0'],
};


// ITERATIVE SOLUTION
function getPINs(observed) {

	// you'll need to hard-code this no matter the approach


	let possibilities = ['']; //for this solution, we need at least one element to start so we use empty string

	// do until string is empty
	while (observed) {
		let adjacents = pad[observed[0]]; // get all adjacent pins for the current number
		let newPossibles = []; // to hold our current iterations combinations

		// for every number that a digit could have actually been (1 -> 1,2,4)
		for (let i = 0; i < adjacents.length; i++) {

			// we want to add this digit to end of every possible combination we have so far
			for (let j = 0; j < possibilities.length; j++) {
				newPossibles.push(possibilities[j] + adjacents[i]); //concat each of the adjacent possibility
			}
		}
		console.log('current possibilities:', newPossibles);
		// replace (update) old possibilities with new ones
		possibilities = newPossibles;
		// remove digit we just processed from observed
		observed = observed.slice(1);
	}
	return possibilities;
}




// recursive solution
function getPINs2(observed) {
	// what we will return
	var possibilities = [];


	function getAdjacents(observed, path) {
		console.log('path:', path)
		// BASE CASE: observed string is empty, path is full length
		if (!observed) {
			return possibilities.push(path);
		}

		// array of possible digits
		var adjacent = pad[observed[0]];

		// remove digit we just processed from 'observed' 
		observed = observed.slice(1);

		// RECURSE with shortened 'observed' string
		// and every possible new path
		for (var i = 0; i < adjacent.length; i++) {
			getAdjacents(observed, path + adjacent[i]);
		}
	}
	getAdjacents(observed, '');
	console.log(possibilities);

	return possibilities;
}



function getPINs3(observed) {
	// form array of arrays of possibilities for each observed digit
	let optionsArray = observed.split('').map(function (digit) {
		return pad[digit];
	});
	let final = [];
	// recurse through each subarray to form all possibilities
	// adding each digit from the next array to a new combo
	(function formCombos(array, combo) {
		// base case --> combo/path has reached length of observed pin
		if (combo.length === optionsArray.length) return final.push(combo);
		array.forEach(function (digit) {
			return formCombos(optionsArray[combo.length + 1], combo + digit);
		})
	})(optionsArray[0], '')
	return final;
}


function getPINs4(observed) {
	// Object mapping out possibilities based on observed digit.
	const adj = {
		0: ['8', '0'],
		1: ['1', '2', '4'],
		2: ['1', '2', '3', '5'],
		3: ['2', '3', '6'],
		4: ['1', '4', '5', '7'],
		5: ['2', '4', '5', '6', '8'],
		6: ['3', '5', '6', '9'],
		7: ['4', '7', '8'],
		8: ['5', '7', '8', '9', '0'],
		9: ['6', '8', '9']
	}

	// If there is only one observed digit, return array of possibilities from the object above.
	if (observed.length === 1) return adj[observed]

	// Get the remaining possibilities from remaining digits.
	const theRest = getPINs(observed.slice(1))

	// Place each possible digit from current observed digit and place it front of every possibility from
	// above array of possibilities (based on remaining observed digits). Return big array of possibilities.
	return adj[observed[0]].reduce((accum, num) => [...accum, ...theRest.map(pins => num.concat(pins))], [])
}




module.exports = getPINs




// function getPINs(observed) {
// 	let neighbors = {
// 		"0": ["0", "8"],
// 		"1": ["1", "2", "4"],
// 		"2": ["1", "2", "3", "5"],
// 		"3": ["2", "3", "6"],
// 		"4": ["1", "4", "5", "7"],
// 		"5": ["2", "4", "5", "6", "8"],
// 		"6": ["3", "5", "6", "9"],
// 		"7": ["4", "7", "8"],
// 		"8": ["5", "7", "8", "9", "0"],
// 		"9": ["6", "8", "9"]
// 	};
// 	let returnArr = [];

// 	adjacentNumbers[num].forEach(possibleNum => {
// 		returnArr.push(possibleNum);
// 	});

// 	return returnArr;

// 	return observed.split("").map(possibleNum => (neighbors[possibleNum])).reduce((pre, cur) => [].concat.apply([], pre.map(possibleNum => cur.map(g => possibleNum + g))));
// }

