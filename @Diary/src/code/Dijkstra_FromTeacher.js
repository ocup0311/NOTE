class Node {
  constructor(value) {
    this.value = value
    this.visited = false
    this.edges = []
    this.distanceFromStartNode = Infinity
    this.previous = null
  }
  addEdges(edge) {
    this.edges.push(edge)
  }
}

class Edge {
  constructor(node, weight) {
    this.node = node
    this.weight = weight
  }
}
let A = new Node('A')
let B = new Node('B')
let C = new Node('C')
let D = new Node('D')
let E = new Node('E')
let F = new Node('F')
let G = new Node('G')
let H = new Node('H')
let I = new Node('I')
let J = new Node('J')
let K = new Node('K')

A.addEdges(new Edge(B, 2))
A.addEdges(new Edge(G, 3))

B.addEdges(new Edge(A, 2))
B.addEdges(new Edge(C, 3))
B.addEdges(new Edge(D, 2))

C.addEdges(new Edge(B, 3))
C.addEdges(new Edge(D, 5))

D.addEdges(new Edge(B, 2))
D.addEdges(new Edge(C, 5))
D.addEdges(new Edge(E, 4))

E.addEdges(new Edge(D, 4))
E.addEdges(new Edge(F, 8))

F.addEdges(new Edge(E, 8))
F.addEdges(new Edge(G, 1))

G.addEdges(new Edge(A, 3))
G.addEdges(new Edge(F, 1))
G.addEdges(new Edge(H, 4))
G.addEdges(new Edge(I, 3))
G.addEdges(new Edge(J, 5))

H.addEdges(new Edge(G, 4))
H.addEdges(new Edge(I, 2))

I.addEdges(new Edge(G, 3))
I.addEdges(new Edge(H, 2))
I.addEdges(new Edge(K, 2))

K.addEdges(new Edge(I, 2))

J.addEdges(new Edge(G, 5))

class MinHeap {
  constructor() {
    this.values = []
  }

  enqueue(node) {
    // check if the priority queue is empty
    if (this.values.length === 0) {
      this.values.push(node)
      return true
    }

    this.values.push(node)
    let newIndex = this.values.length - 1
    let parentIndex = Math.floor((newIndex - 1) / 2)
    while (
      parentIndex >= 0 &&
      this.values[newIndex].distanceFromStartNode <
        this.values[parentIndex].distanceFromStartNode
    ) {
      // swap parent and child
      let result = this.values[parentIndex]
      this.values[parentIndex] = this.values[newIndex]
      this.values[newIndex] = result
      // update index number
      newIndex = parentIndex
      parentIndex = Math.floor((newIndex - 1) / 2)
    }
  }

  dequeue() {
    if (this.values.length === 0) {
      return null
    }
    if (this.values.length === 1) {
      let removedNode = this.values.pop()
      return removedNode
    }

    // swap two nodes
    let temp = this.values.pop()
    this.values.push(this.values[0])
    this.values[0] = temp
    let removedNode = this.values.pop()

    this.minHeapify(0)

    return removedNode
  }

  minHeapify(i) {
    let smallest
    let l = i * 2 + 1
    let r = i * 2 + 2
    if (
      l <= this.values.length - 1 &&
      this.values[l].distanceFromStartNode <
        this.values[i].distanceFromStartNode
    ) {
      smallest = l
    } else {
      smallest = i
    }

    if (
      r <= this.values.length - 1 &&
      this.values[r].distanceFromStartNode <
        this.values[smallest].distanceFromStartNode
    ) {
      smallest = r
    }

    if (smallest != i) {
      // swap
      let temp = this.values[i]
      this.values[i] = this.values[smallest]
      this.values[smallest] = temp
      this.minHeapify(smallest)
    }
  }
}

function Dijkstra(node) {
  let MH = new MinHeap()
  node.distanceFromStartNode = 0
  node.visited = true
  MH.enqueue(A)
  MH.enqueue(B)
  MH.enqueue(C)
  MH.enqueue(D)
  MH.enqueue(E)
  MH.enqueue(F)
  MH.enqueue(G)
  MH.enqueue(H)
  MH.enqueue(I)
  MH.enqueue(J)
  MH.enqueue(K)
  let currentNode = MH.dequeue()

  while (MH.values.length > 0) {
    currentNode.edges.forEach((edge) => {
      let neighborNode = edge.node
      if (!neighborNode.visited) {
        let d1 = neighborNode.distanceFromStartNode
        let d2 = currentNode.distanceFromStartNode
        let d3 = edge.weight
        if (d1 > d2 + d3) {
          neighborNode.distanceFromStartNode = d2 + d3
          neighborNode.previous = currentNode
        }
      }
    })
    currentNode = MH.dequeue()
  }
}

Dijkstra(D)
console.log("A's information")
console.log(A.distanceFromStartNode)
console.log("B's Info")
console.log(B.distanceFromStartNode)
console.log("C's Info")
console.log(C.distanceFromStartNode)
console.log("D's Info")
console.log(D.distanceFromStartNode)
console.log("E's Info")
console.log(E.distanceFromStartNode)
console.log("F's Info")
console.log(F.distanceFromStartNode)
console.log("G's Info")
console.log(G.distanceFromStartNode)
console.log("H's Info")
console.log(H.distanceFromStartNode)
console.log("I's Info")
console.log(I.distanceFromStartNode)
console.log("J's Info")
console.log(J.distanceFromStartNode)
console.log("K's Info")
console.log(K.distanceFromStartNode)
