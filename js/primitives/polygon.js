class Polygon {
	constructor(nodes) {
		this.nodes = nodes
		this.links = []
		for (let i = 1; i <= nodes.length; i++) {
			this.links.push(new Link(nodes[i - 1], nodes[i % nodes.length]))
		}
	}

	static multiBreak(polygons) {
		for (let i = 0; i < polygons.length - 1; i++) {
			for (let j = i + 1; j < polygons.length; j++) {
				this.break(polygons[i], polygons[j])
			}
		}
	}

	static union(polygons) {
		Polygon.multiBreak(polygons)
		const keptLinks = []
		for (let i = 0; i < polygons.length; i++) {
			for (const link of polygons[i].links) {
				let keep = true
				for (let j = 0; j < polygons.length; j++) {
					if (i != j) {
						if (polygons[j].containsLink(link)) {
							keep = false
							break
						}
					}
				}
				if (keep) {
					keptLinks.push(link)
				}
			}
		}
		return keptLinks
	}

	static break(poly1, poly2) {
		const links1 = poly1.links
		const links2 = poly2.links
		for (let i = 0; i < links1.length; i++) {
			for (let j = 0; j < links2.length; j++) {
				const intersection = getIntersection(
					links1[i].from,
					links1[i].to,
					links2[j].from,
					links2[j].to
				)
				if (
					intersection &&
					intersection.offset != 1 &&
					intersection.offset != 0
				) {
					const node = new Node(intersection.x, intersection.y)

					let aux = links1[i].to
					links1[i].to = node
					links1.splice(i + 1, 0, new Link(node, aux))
					aux = links2[j].to
					links2[j].to = node
					links2.splice(j + 1, 0, new Link(node, aux))
				}
			}
		}
	}

	containsLink(link) {
		const midpoint = average(link.from, link.to)
		return this.containsNode(midpoint)
	}

	containsNode(node) {
		const outerNode = new Node(-1000, -1000)
		let intersectionCount = 0
		for (const link of this.links) {
			const int = getIntersection(outerNode, node, link.from, link.to)
			if (int) {
				intersectionCount++
			}
		}
		return intersectionCount % 2 == 1
	}

	drawSegments(ctx) {
		for (const link of this.links) {
			link.draw(ctx, { color: getRandomColor(), width: 5 })
		}
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
