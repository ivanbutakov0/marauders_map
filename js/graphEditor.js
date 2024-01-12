class GraphEditor {
	constructor(canvas, graph) {
		this.canvas = canvas
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
		this.node = new Node(e.offsetX, e.offsetY)
		this.hovered = getNearestNode(this.node, this.graph.nodes)
		if (this.dragging === true) {
			this.selected.x = this.node.x
			this.selected.y = this.node.y
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
