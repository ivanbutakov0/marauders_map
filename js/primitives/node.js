class Node {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	equals(node) {
		return this.x === node.x && this.y === node.y
	}

	draw(ctx, radius = 9, color = 'black') {
		ctx.beginPath()
		ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
		ctx.fillStyle = color
		ctx.fill()
	}
}
