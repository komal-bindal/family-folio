import { useState } from "react";

function TreeNode(value) {
  return {
    value: value,
    children: [],
  };
}
export function NaryTree(rootVal) {
  const [root, setRoot] = useState(TreeNode(rootVal));

  // Function to add a node to the tree
  function addNode(parentValue, nodeVal) {
    console.log(parentValue, nodeVal);
    if (!root) {
      if (parentValue !== null) {
        throw new Error("Cannot add child to non-existing root");
      }
      setRoot(TreeNode(nodeVal));
      return;
    }
    const parentNode = findParentNode(root, parentValue);

    if (!parentNode) {
      throw new Error(`Parent node with value ${parentValue} not found`);
    }

    const newNode = TreeNode(nodeVal);
    parentNode.children.push(newNode);
    return newNode;
  }

  function findParentNode(node, parentVal) {
    if (node.value === parentVal) {
      return node;
    }
    for (const child of node.children) {
      const found = findParentNode(child, parentVal);
      if (found) {
        return found;
      }
    }
    return null;
  }

  // Function to search for a value in the tree
  function search(value) {
    if (!root) return null;

    const queue = [root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current.value === value) {
        return current;
      }
      for (const child of current.children) {
        queue.push(child);
      }
    }
    return null;
  }

  // Function to perform a breadth-first traversal of the tree
  function breadthFirstTraversal() {
    if (!root) return [];

    const result = [];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue.shift();
      result.push(current.value);
      for (const child of current.children) {
        queue.push(child);
      }
    }
    return result;
  }

  // Function to perform a depth-first traversal of the tree
  function depthFirstTraversal() {
    if (!root) return [];

    const result = [];
    function dfs(node) {
      result.push(node.value);
      for (const child of node.children) {
        dfs(child);
      }
    }
    dfs(root);
    return result;
  }

  function getParentChildData() {
    if (!root) return [];
    const result = [{ parent: null, name: root.value }];
    const queue = [root];
    while (queue.length > 0) {
      const current = queue.shift();
      for (const child of current.children) {
        result.push({ parent: current.value, name: child.value });
        queue.push(child);
      }
    }
    return result;
  }

  function maxHeight() {
    if (!root) return 0;

    function calculateHeight(node) {
      if (node.children.length === 0) {
        return 1; // Leaf node height is 1
      }

      let maxHeight = 0;
      for (const child of node.children) {
        const childHeight = calculateHeight(child);
        maxHeight = Math.max(maxHeight, childHeight);
      }

      return maxHeight + 1; // Add 1 for the current node
    }

    return calculateHeight(root);
  }

  return {
    root,
    addNode,
    search,
    breadthFirstTraversal,
    depthFirstTraversal,
    getParentChildData,
    maxHeight,
  };
}
