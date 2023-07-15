import { synNode } from '../variable.js';

function searchNode(tree, value) {
  const stack = [tree];
  while (stack.length > 0) {
    const node = stack.shift();
    if (node.word === value) return node;
    node.children && stack.push(...node.children);
  }
  return null;
}

function searchParentNode(tree, value) {
  if (tree.word === value) return [value];
  if (!tree.children) return false;
  let parentNode;
  tree.children.find((x) => (parentNode = searchParentNode(x, value)));
  if (parentNode) {
    return [tree.word].concat(parentNode);
  }
}

function updateCurWord(word, remove = false) {
  let date = new Date();
  date = date.getTime().toString().slice(4);
  const newWord = `${word} ${date}`;
  if (remove) {
    synNode.word = newWord;
    synNode.children = [];
  } else if (!synNode.word) {
    synNode.word = newWord;
    synNode.children = [];
  } else {
    const curWord = localStorage.getItem('curWord');
    const curNode = searchNode(synNode, curWord);
    const newNode = {
      word: newWord,
      children: [],
    };
    curNode.children.push(newNode);
  }
  // console.log(synNode);
  localStorage.setItem('curWord', newWord);
}

export { updateCurWord, searchNode, searchParentNode };
