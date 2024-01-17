function getNearestNode(location, nodes, radius = 16) {
	let minDist = radius
	let nearest = null
	for (let node of nodes) {
		const dist = distance(location, node)
		if (dist < minDist) {
			nearest = node
		}
	}

	return nearest
}

function distance(a, b) {
	return Math.hypot(a.x - b.x, a.y - b.y)
}

function subtract(endNode, startNode) {
	return new Node(endNode.x - startNode.x, endNode.y - startNode.y)
}

function add(node1, node2) {
	return new Node(node1.x + node2.x, node1.y + node2.y)
}

function scale(node, scaler) {
	return new Node(node.x * scaler, node.y * scaler)
}
