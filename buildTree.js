import Node from "./Node.js";

function buildTree(array) {
  if (array.length === 1) {
    let Value = new Node(undefined, array[0], undefined);
    return Value;
  }
  let MainArray = check(array);
  let MainSortedArray = sortedArray(MainArray);
  console.log(MainSortedArray);
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
console.log(buildTree(ArraySorted));
