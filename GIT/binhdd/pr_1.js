class Stack {
  constructor() {
    this.stack = [];
  }

  push(item) {
    return this.stack.push(item);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.length - 1];
  }

  get length() {
    return this.stack.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}


function palindromeRearranging(string){
	stack = new Stack();
	for(item of string){
		if(stack.isEmpty()){
			stack.push(item)
		}
		else if(item===stack.peek()){
			stack.pop();
		}
		else{
			stack.push(item);
		}
	}
	if(stack.length<2) {
		console.log('true');
		return true;
	}
	else{
		console.log('false');
		return false;
	}
}


palindromeRearranging('aacbb');


function sortByHeight(arr){
	let index;
	let resultArr = [];
	let concatArr = [];
	for(let i = 0; i<arr.length;i++){
		concatArr.push(arr[i]);
	}
	concatArr.sort((a,b)=> a-b);
	for(let i = 0; i<concatArr.length;i++){
		if(concatArr[i]!=-1){
			index=i;
			break;
		}
	}
	for(let i = 0; i<arr.length;i++){
		if(arr[i]===-1){
			resultArr.push(-1);
		}
		else{
			resultArr.push(concatArr[index]);
			index++;
		}
	}

	return resultArr;
}

console.log(sortByHeight([-1, 150, 190, 170, -1, -1, 160, 170]));


function reverselnParentheses(inputString){
	let head;
	let tail;
	resultString = inputString.slice(0);
	for(let i = 0;i < resultString.length-1;i++){
		if(resultString[i] === '(') {
			head = i;
        }	
	}
	while(head >= 0){
		if (resultString[head] === '(')
		{
			for(let j = head+1;j < resultString.length;j++){
				if(resultString[j]=== ')'){
					tail = j;
					break;
				}
			}
			
			let reverseString = resultString.slice(head+1,tail);
			let headString = resultString.slice(0,head);
			let tailString = resultString.slice(tail+1, resultString.length);
			reverseString = reverseStringFunc(reverseString);
			resultString = "".concat(headString);
			resultString = resultString.concat(reverseString);
			resultString = resultString.concat(tailString);
		}
		head--;
	}
	return resultString;
}

function reverseStringFunc(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

console.log(reverselnParentheses("foo(bar(baz))blim"));

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

