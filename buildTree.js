import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = buildTree(array);
  }

  insert(value, path = this.root) {
    if (value > path.rootNode && path.right === null) {
      let NewNode = new Node(null, value, null);
      path.right = NewNode;
    }
    if (value < path.rootNode && path.left === null) {
      let NewNode = new Node(null, value, null);

      path.left = NewNode;
    }

    if (value > path.rootNode) {
      return this.insert(value, path.right);
    }
    if (value < path.rootNode) {
      return this.insert(value, path.left);
    }
  }
  delete(value, path = this.root) {
    let traverse;

    if (path.left === null) {
      return path;
    }
    if (value === path.rootNode && path.left !== null && path.right !== null) {
      traverse = this.delete(value, path.right);
      if (traverse.left === null && traverse.right === null) {
        if (path.left !== null) {
          if (path.left.rootNode === traverse.rootNode) {
            path.left = null;
          }
        }

        if (path.right !== null) {
          if (path.right.rootNode === traverse.rootNode) {
            path.right = null;
          }
        }
      }
      if (
        (traverse.left !== null && traverse.right === null) ||
        (traverse.right !== null && traverse.left === null)
      ) {
        if (path.left.rootNode === traverse.rootNode) {
          if (traverse.left !== null) {
            path.left = traverse.left;
          }
          if (traverse.right !== null) {
            path.right = traverse.left;
          }
        }
        if (path.right.rootNode === traverse.rootNode) {
          if (traverse.left !== null) {
            path.right = traverse.left;
          }
          if (traverse.right !== null) {
            path.right = traverse.right;
          }
        }
      }
      return (path.rootNode = traverse.rootNode);
    }
    if (value === path.rootNode) {
      return path;
    }

    if (value > path.rootNode) {
      traverse = this.delete(value, path.right);
    }
    if (value < path.rootNode) {
      traverse = this.delete(value, path.left);
    }
    if (traverse.left === null && traverse.right === null) {
      if (path.left !== null) {
        if (path.left.rootNode === traverse.rootNode) {
          path.left = null;
        }
      }

      if (path.right !== null) {
        if (path.right.rootNode === traverse.rootNode) {
          path.right = null;
        }
      }
    }
    if (
      (traverse.left !== null && traverse.right === null) ||
      (traverse.right !== null && traverse.left === null)
    ) {
      if (path.left.rootNode === traverse.rootNode) {
        if (traverse.left !== null) {
          path.left = traverse.left;
        }
        if (traverse.right !== null) {
          path.right = traverse.left;
        }
      }
      if (path.right.rootNode === traverse.rootNode) {
        if (traverse.left !== null) {
          path.right = traverse.left;
        }
        if (traverse.right !== null) {
          path.right = traverse.right;
        }
      }
    }
    return traverse;
  }
  find(value, path = this.root) {
    let traverse;
    if (value === path.rootNode) {
      return path;
    }

    if (value > path.rootNode) {
      traverse = this.find(value, path.right);
    }
    if (value < path.rootNode) {
      traverse = this.find(value, path.left);
    }

    return traverse;
  }
  levelOrder(callback, queue = [this.root]) {
    if (callback === undefined) {
      throw new Error("Callback function is not provided");
    }
    if (queue[0].left === null && queue[0].right === null) {
      queue.forEach((value, index) => {
        callback(value.rootNode);
      });
      return;
    }
    if (queue[0].left !== null) {
      queue.push(queue[0].left);
    }

    if (queue[0].right !== null) {
      queue.push(queue[0].right);
    }
    callback(queue[0].rootNode);
    queue.shift();
    this.levelOrder(callback, queue);
    return;
  }
  levelOrderIteration(callback, queue = [this.root], i = 0) {
    if (queue[i].left === null && queue[i].right === null) {
      queue.forEach((value, index) => {
        console.log(value.rootNode);
      });

      return;
    }
    if (queue[i].left !== null) {
      queue.push(queue[i].left);
    }
    if (queue[i].right !== null) {
      queue.push(queue[i].right);
    }

    this.levelOrderIteration(callback, queue, (i += 1));
    return queue;
  }
  preOrder(callback, callstack = [this.root]) {
    callback(callstack[0].rootNode);
    if (callstack[0].left !== null) {
      callstack.unshift(callstack[0].left);
      this.preOrder(callback, callstack);
      callstack.shift();
    }
    if (callstack[0].right !== null) {
      callstack.unshift(callstack[0].right);
      this.preOrder(callback, callstack);
      callstack.shift();
    }
  }
  inOrder(callback, callstack = [this.root]) {
    if (callstack[0].left === null) {
      callback(callstack[0].rootNode);
      callstack.shift();
      return;
    }

    if (callstack[0].left !== null) {
      callstack.unshift(callstack[0].left);
      this.inOrder(callback, callstack);
    }
    callback(callstack[0].rootNode);

    if (callstack[0].right !== null) {
      callstack.unshift(callstack[0].right);
      this.inOrder(callback, callstack);
    }

    callstack.shift();
  }
}

function buildTree(array) {
  if (array.length === 0) {
    return null;
  }
  if (array.length === 1) {
    let Value = new Node(null, array[0], null);
    return Value;
  }
  let MainArray = check(array);
  let MainSortedArray = sortedArray(MainArray);
  let middleValue = Math.floor(MainSortedArray.length / 2);
  let leftArray = [];
  let RightArray = [];
  for (let i = 0; i < MainSortedArray.length; i++) {
    if (i < middleValue) {
      leftArray.push(MainSortedArray[i]);
    } else {
      RightArray.push(MainSortedArray[i]);
    }
  }
  let rootValue = MainSortedArray[middleValue];
  if (RightArray.includes(rootValue)) {
    RightArray.shift();
  }
  let rootNode = new Node(
    buildTree(leftArray),
    rootValue,
    buildTree(RightArray)
  );
  return rootNode;
}

function sortedArray(array) {
  if (array.length === 1) {
    return array;
  }
  let middlePoint = Math.floor(array.length / 2);
  let leftArray = [];
  let RightArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i < middlePoint) {
      leftArray.push(array[i]);
    } else {
      RightArray.push(array[i]);
    }
  }
  let finalValue = sort(sortedArray(leftArray), sortedArray(RightArray));

  return finalValue;
}

function check(array) {
  let NonDuplicateArray = [];
  array.forEach((value, index) => {
    if (!NonDuplicateArray.includes(value)) {
      NonDuplicateArray.push(value);
    }
  });

  return NonDuplicateArray;
}

function sort(leftArray, rightArray) {
  let finalArray = [];
  function checkingArray(leftArray) {
    if (leftArray.length === 0) {
      return false;
    } else {
      return true;
    }
  }

  for (let i = 0; checkingArray(leftArray); i++) {
    if (leftArray[0] > rightArray[0]) {
      finalArray.push(rightArray.shift());
    } else {
      finalArray.push(leftArray.shift());
    }
  }

  return [...finalArray, ...leftArray, ...rightArray];
}

let ArraySorted = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let TreeValue = new Tree(ArraySorted);

TreeValue.inOrder((node) => {
  console.log(node);
});
