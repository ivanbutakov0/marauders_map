class GraphEditor {
	constructor(viewport, graph) {
		this.viewport = viewport
		this.canvas = viewport.canvas
		this.graph = graph

		this.ctx = this.canvas.getContext('2d')

		this.selected = null
		this.hovered = null
		this.dragging = false
		this.node = null

		this.#addEventListener()
	}

	#addEventListener() {
		// disable right click menu
		this.canvas.addEventListener('contextmenu', e => {
			e.preventDefault()
		})

		this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))

		this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))

		this.canvas.addEventListener('mouseup', () => {
			this.dragging = false
		})
	}

	#handleMouseDown(e) {
		// check if right click
		if (e.button === 2) {
			if (this.selected) {
				this.selected = null
			} else if (this.hovered) {
				this.#removeNode(this.hovered)
			}
			return
		}

		// check if left click
		if (e.button === 0) {
			if (this.hovered) {
				this.#select(this.hovered)
				this.dragging = true
				return
			}

			this.graph.tryAddNode(this.node)
			this.#select(this.node)
			this.hovered = this.node
		}
	}

	#handleMouseMove(e) {
		this.node = this.viewport.getMouse(e, true)
		this.hovered = getNearestNode(
			this.node,
			this.graph.nodes,
			this.#handleHoverRadius()
		)
		if (this.dragging === true) {
			this.selected.x = this.node.x
			this.selected.y = this.node.y
		}
	}

	#handleHoverRadius() {
		if (this.viewport.zoom < 1) {
			return 20
		} else if (this.viewport.zoom > 1) {
			return 10
		} else {
			return 16
		}
	}

	#select(node) {
		if (this.selected) {
			this.graph.tryAddLink(new Link(this.selected, node))
		}
		this.selected = node
	}

	#removeNode(node) {
		this.graph.removeNode(node)
		if (this.selected === node) {
			this.selected = null
		}
		this.hovered = null
	}

	display() {
		this.graph.draw(this.ctx)

		if (this.hovered) {
			this.hovered.draw(this.ctx, { fill: true })
		}
		if (this.selected) {
			const aimNode = this.hovered || this.node
			new Link(this.selected, aimNode).draw(this.ctx, { dash: [3, 3] })
			this.selected.draw(this.ctx, { outline: true })
		}
	}
}
