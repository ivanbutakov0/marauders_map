class Polygon {
	constructor(nodes) {
		this.nodes = nodes
	}

	draw(
		ctx,
		{ stroke = 'blue', lineWidth = 2, fill = 'rgba(0, 0, 255, 0.2)' } = {}
	) {
		ctx.beginPath()
		ctx.fillStyle = fill
		ctx.strokeStyle = stroke
		ctx.lineWidth = lineWidth
		ctx.moveTo(this.nodes[0].x, this.nodes[0].y)
		for (let node of this.nodes) {
			ctx.lineTo(node.x, node.y)
		}
		ctx.closePath()
		ctx.stroke()
		ctx.fill()
	}
}
