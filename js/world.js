class World {
	constructor(graph, roadWidth = 100, roadRoundness = 10) {
		this.graph = graph
		this.roadWidth = roadWidth
		this.roadRoundness = roadRoundness

		this.envelopes = []
		this.roadBorders = []

		this.generate()
	}

	generate() {
		this.envelopes.length = 0
		for (const link of this.graph.links) {
			this.envelopes.push(
				new Envelope(link, this.roadWidth, this.roadRoundness)
			)
		}

		this.roadBorders = Polygon.union(this.envelopes.map(e => e.polygon))
	}

	draw(ctx) {
		for (const env of this.envelopes) {
			env.draw(ctx, { fill: '#9b946a', stroke: '#9b946a', lineWidth: 15 })
		}
		/* for (const link of this.roadBorders) {
			link.draw(ctx, { color: '#BDB99E', width: 4 })
		} */
	}
}
