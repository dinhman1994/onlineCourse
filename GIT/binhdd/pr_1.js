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


function check(string){
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


check('aacbb');