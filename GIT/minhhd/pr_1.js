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
        firstHalf = inputStrArr.splice(0, half-1).reverse();
        secondHalf = inputStrArr.splice(-half+1);
    }
    var temp = 0;
    for (let i = 0; i < half; i++) {
        if (firstHalf[i] === secondHalf[i]) {
            temp++;
        }

    }
    if (temp === half) {
        return true;
    } else {
        return false;
    }

}

console.log(palindromeRearranging('xxeexx'));