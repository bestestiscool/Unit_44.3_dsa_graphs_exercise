class Node {
  constructor(value, adjacent = new Set()) {
    // Stores the value of the node
    this.value = value;
    // Stores adjacent nodes in a set to represent edges
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    // Set to store all nodes in the graph
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    // Add a single vertex (node) to the graph
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    // Add multiple vertices to the graph by iterating over the array
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    // Create a two-way (undirected) edge between v1 and v2 by adding each to the other’s adjacency set
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    // Remove the two-way edge between v1 and v2 by deleting each from the other’s adjacency set
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    // Remove vertex from all adjacent nodes’ sets and then delete it from the graph’s nodes set
    for (let neighbor of vertex.adjacent) {
      neighbor.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    // Set to keep track of visited nodes
    const visited = new Set();
    // Array to store the result of DFS traversal
    const result = [];

    // Helper function for DFS traversal
    function dfs(vertex) {
      if (!vertex) return; // Exit if vertex is null
      visited.add(vertex); // Mark the current node as visited
      result.push(vertex.value); // Add the current node’s value to the result

      // Recursively visit each adjacent node if it hasn't been visited
      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          dfs(neighbor);
        }
      }
    }

    // Start DFS traversal from the given start node
    dfs(start);
    return result; // Return the final DFS traversal order
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    // Set to keep track of visited nodes
    const visited = new Set();
    // Array to store the result of BFS traversal
    const result = [];
    // Queue for BFS traversal
    const queue = [start];
    visited.add(start); // Mark the start node as visited

    // Continue while there are nodes left in the queue
    while (queue.length) {
      // Remove the first node from the queue
      const vertex = queue.shift();
      result.push(vertex.value); // Add the node’s value to the result

      // For each adjacent node, add to the queue if it hasn’t been visited
      for (let neighbor of vertex.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    return result; // Return the final BFS traversal order
  }
}

module.exports = { Graph, Node };
