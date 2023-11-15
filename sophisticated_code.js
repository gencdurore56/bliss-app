// sophisticated_code.js
// This code demonstrates a complex algorithm for finding the shortest path between two nodes in a weighted graph.

// Define the Graph class
class Graph {
  constructor() {
    this.nodes = [];
    this.edges = {};
  }

  addNode(node) {
    this.nodes.push(node);
    this.edges[node] = {};
  }

  addEdge(node1, node2, weight) {
    this.edges[node1][node2] = weight;
    this.edges[node2][node1] = weight;
  }

  dijkstra(startNode, endNode) {
    const distances = {};
    const previous = {};
    const queue = Object.assign(this.nodes);

    // Set initial distances to infinity, except for start node
    this.nodes.forEach(node => {
      distances[node] = node === startNode ? 0 : Infinity;
    });

    while (queue.length) {
      // Find the node with the shortest distance
      const current = queue.reduce((minNode, node) => (
        distances[node] < distances[minNode] ? node : minNode
      ));

      // Remove current node from the queue
      queue.splice(queue.indexOf(current), 1);

      // Explore neighbors of current node
      Object.keys(this.edges[current]).forEach(neighbor => {
        const distance = distances[current] + this.edges[current][neighbor];
        if (distance < distances[neighbor]) {
          // Update distance and set previous node
          distances[neighbor] = distance;
          previous[neighbor] = current;
        }
      });
    }

    // Build the shortest path by traversing previous nodes
    let path = [endNode];
    let node = endNode;
    while (node !== startNode) {
      node = previous[node];
      path.unshift(node);
    }

    return path;
  }
}

// Create a new graph
const graph = new Graph();

// Add nodes to the graph
graph.addNode('A');
graph.addNode('B');
graph.addNode('C');
graph.addNode('D');
graph.addNode('E');
graph.addNode('F');

// Add edges between nodes (weighted graph)
graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'C', 1);
graph.addEdge('B', 'D', 5);
graph.addEdge('C', 'E', 10);
graph.addEdge('D', 'E', 2);
graph.addEdge('D', 'F', 8);
graph.addEdge('E', 'F', 6);

// Find the shortest path using Dijkstra's algorithm
const shortestPath = graph.dijkstra('A', 'F');

console.log('Shortest Path:', shortestPath);
// Output: Shortest Path: [ 'A', 'C', 'B', 'D', 'F' ]