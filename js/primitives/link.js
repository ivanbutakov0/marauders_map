class Link {
	constructor(from, to) {
		this.from = from
		this.to = to
	}

	equals(link) {
		return this.includes(link.from) && this.includes(link.to)
	}

	includes(node) {
		return this.from.equals(node) || this.to.equals(node)
	}

	draw(ctx, width = 2, color = 'black') {
		ctx.beginPath()
		ctx.lineWidth = width
		ctx.strokeStyle = color
		ctx.moveTo(this.from.x, this.from.y)
		ctx.lineTo(this.to.x, this.to.y)
		ctx.stroke()
	}
}
