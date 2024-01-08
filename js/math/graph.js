class Graph {
	constructor(nodes = [], links = []) {
		this.nodes = nodes
		this.links = links
	}

	removeLink(link) {
		if (this.links.length <= 0) {
			console.log('no links to remove')
			return
		}
		this.links.splice(this.links.indexOf(link), 1)
	}

	addLink(link) {
		this.links.push(link)
	}

	containsLink(link) {
		return this.links.find(l => l.equals(link))
	}

	tryAddLink(link) {
		if (!this.containsLink(link) && !link.from.equals(link.to)) {
			this.addLink(link)
			return 'link added'
		}
		return 'cannot add link'
	}

	getLinksWithNode(node) {
		const links = []
		for (let link of this.links) {
			if (link.includes(node)) {
				links.push(link)
			}
		}
		return links
	}

	removeNode(node) {
		const links = this.getLinksWithNode(node)

		for (let link of links) {
			this.removeLink(link)
		}

		if (this.nodes.length <= 0) {
			console.log('no nodes to remove')
			return
		}
		this.nodes.splice(this.nodes.indexOf(node), 1)
	}

	addNode(node) {
		this.nodes.push(node)
	}

	containsNode(node) {
		return this.nodes.find(n => n.equals(node))
	}

	tryAddNode(node) {
		if (!this.containsNode(node)) {
			this.addNode(node)
			return true
		}
		return false
	}

	dispose() {
		this.nodes.length = 0
		this.links.length = 0
	}

	draw(ctx) {
		for (let link of this.links) {
			link.draw(ctx)
		}

		for (let node of this.nodes) {
			node.draw(ctx)
		}
	}
}
