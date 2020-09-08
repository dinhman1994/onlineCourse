/**
 * Exercise 1
 * 
 * @param {string} inputString 
 */

function palindromeRearranging(inputString) {
    var inputStrArr = inputString.split('');
    var firstHalf;
    var secondHalf;
    const half = Math.ceil(inputStrArr.length / 2);

    if (inputString.length % 2 === 0) {
        firstHalf = inputStrArr.splice(0, half).reverse();
        secondHalf = inputStrArr.splice(-half);
    } else {
        firstHalf = inputStrArr.splice(0, half - 1).reverse();
        secondHalf = inputStrArr.splice(-half + 1);
    }
    var temp = 0;

    for (let i = 0; i < half; i++) {
        if (firstHalf[i] === secondHalf[i]) {
            temp++;
        }

    }

    return temp === half;

}


/**
 * Exercise 2
 * 
 * @param {Array} arr 
 */

function sortByHeight(arr) {

    var temp = [];
    arr.map((i) => {
        if (i !== -1) {
            temp.push(i);
        }
    });

    temp.sort();

    var index = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== -1) {
            arr[i] = temp[index];
            index++;
        }
    }

    return arr;
}

/**
 * Exercise 3
 * 
 * @param {string} inputString 
 */

function reverseInParentheses(inputString) {
    var stack = [];

    for (var char of inputString) {

        if (char !== ')') {
            stack.push(char);
            continue;
        }
        let c = stack.pop();
        let queue = [];

        while (c !== '(') {
            queue.push(c);
            c = stack.pop();
        }

        while (queue.length) {
            stack.push(queue.shift());
        }
    }

    return stack.join('');
}

/**
 * @function sum
 * @desc Sum of two number
 *
 * @arg {number} a - First number
 * @arg {number} b - Second number
 * @returns {number} Sum of a and b
 */
function sum(a, b) {
  return a + b;
}
