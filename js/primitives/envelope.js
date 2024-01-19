class Envelope {
	constructor(skeleton, width, roundness = 15) {
		this.skeleton = skeleton
		this.polygon = this.#generatePolygon(width, roundness)
	}

	#generatePolygon(width, roundness) {
		const { from: node1, to: node2 } = this.skeleton

		const radius = width / 2
		const alpha = angle(subtract(node1, node2))
		const alpha_cw = alpha + Math.PI / 2
		const alpha_ccw = alpha - Math.PI / 2

		const nodes = []
		const step = Math.PI / Math.max(1, roundness)
		const eps = step / 2
		for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
			nodes.push(translate(node1, i, radius))
		}
		for (let i = alpha_ccw; i <= alpha_cw + eps; i += step) {
			nodes.push(translate(node2, Math.PI + i, radius))
		}

		return new Polygon(nodes)
	}

	draw(ctx, options) {
		this.polygon.draw(ctx, options)
	}
}
