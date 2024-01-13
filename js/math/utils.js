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
