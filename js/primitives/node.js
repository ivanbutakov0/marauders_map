class Node {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	equals(node) {
		return this.x === node.x && this.y === node.y
	}

	draw(
		ctx,
		{ radius = 9, color = 'black', outline = false, fill = false } = {}
	) {
		ctx.beginPath()
		ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
		ctx.fillStyle = color
		ctx.fill()

		if (outline) {
			ctx.beginPath()
			ctx.lineWidth = 2
			ctx.strokeStyle = 'yellow'
			ctx.arc(this.x, this.y, radius * 0.6, 0, 2 * Math.PI)
			ctx.stroke()
		}

		if (fill) {
			ctx.beginPath()
			ctx.fillStyle = 'yellow'
			ctx.arc(this.x, this.y, radius * 0.4, 0, 2 * Math.PI)
			ctx.fill()
		}
	}
}
