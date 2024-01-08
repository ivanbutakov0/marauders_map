function getNearestNode(location, nodes) {
	let minDist = 16
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
