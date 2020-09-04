//bai tap 1

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

    if (temp === half) {
        return true;
    }
    
    return false;

}


//bai tap 2


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


//bai tap 3

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

