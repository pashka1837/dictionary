import { searchInput, synNode } from '../variable.js';

function trimAndFilterInput(str) {
  return str
    .trim()
    .toLowerCase()
    .split(` `)
    .filter((word) => word !== ``)
    .join(` `);
}
function focusOnBody() {
  searchInput.blur();
  document.body.focus();
}

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

// function searchParentNode(tree, value) {
//   if (tree.word === value) return [value];
//   if (!tree.children) return false;
//   const parentNode = [];
//   tree.children.find((x) => parentNode.push(searchParentNode(x, value)));
//   if (parentNode) {
//     return parentNode.push(tree.word);
//   }
// }

function updateCurWord(word, remove = false) {
  if (remove) {
    synNode.word = word;
    synNode.children = [];
  } else if (!synNode.word) {
    synNode.word = word;
    synNode.children = [];
  } else {
    const curWord = localStorage.getItem('curWord');
    const curNode = searchNode(synNode, curWord);
    let newNode = searchNode(synNode, word);
    if (!newNode) {
      newNode = {
        word,
        children: [],
      };
      curNode.children.push(newNode);
    }
  }
  console.log(synNode);
  localStorage.setItem('curWord', word);
}

// function updateCurWord(word, remove = false) {
//   if (remove) words.splice(0);
//   const isExists = words.find((el) => el === word);
//   if (!isExists) words.push(word);
//   localStorage.setItem('curWord', word);
// }

const wait = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export {
  trimAndFilterInput,
  focusOnBody,
  wait,
  updateCurWord,
  searchNode,
  searchParentNode,
};
