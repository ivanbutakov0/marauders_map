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

function average(node1, node2) {
	return new Node((node1.x + node2.x) / 2, (node1.y + node2.y) / 2)
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

function translate(loc, angle, offset) {
	return new Node(
		loc.x + Math.cos(angle) * offset,
		loc.y + Math.sin(angle) * offset
	)
}

function angle(node) {
	return Math.atan2(node.y, node.x)
}

function getIntersection(A, B, C, D) {
	const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x)
	const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y)
	const bottom = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y)

	if (bottom != 0) {
		const t = tTop / bottom
		const u = uTop / bottom
		if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
			return {
				x: lerp(A.x, B.x, t),
				y: lerp(A.y, B.y, t),
				offset: t,
			}
		}
	}

	return null
}

function lerp(a, b, t) {
	return a + (b - a) * t
}

function getRandomColor() {
	const hue = 290 + Math.random() * 260
	return 'hsl(' + hue + ', 100%, 60%)'
}
