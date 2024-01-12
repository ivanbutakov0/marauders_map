class GraphEditor {
	constructor(canvas, graph) {
		this.canvas = canvas
		this.graph = graph

		this.ctx = this.canvas.getContext('2d')

		this.selected = null
		this.hovered = null
		this.dragging = false

		this.#addEventListener()
	}

	#addEventListener() {
		// disable right click menu
		this.canvas.addEventListener('contextmenu', e => {
			e.preventDefault()
		})

		this.canvas.addEventListener('mousedown', e => {
			// check if right click
			if (e.button === 2) {
				if (this.hovered) {
					this.graph.removeNode(this.hovered)
					if (this.selected === this.hovered) {
						this.selected = null
					}
					this.hovered = null
				}
				return
			}

			// check if left click
			if (e.button === 0) {
				const node = new Node(e.offsetX, e.offsetY)
				if (this.hovered) {
					this.selected = this.hovered
					this.dragging = true
					return
				}
				this.graph.tryAddNode(node)
				this.selected = node
				this.hovered = node
			}
		})

		this.canvas.addEventListener('mousemove', e => {
			const node = new Node(e.offsetX, e.offsetY)
			this.hovered = getNearestNode(node, this.graph.nodes)
			if (this.dragging === true) {
				this.selected.x = node.x
				this.selected.y = node.y
			}
		})

		this.canvas.addEventListener('mouseup', () => {
			this.dragging = false
		})
	}

	display() {
		this.graph.draw(this.ctx)

		if (this.hovered) {
			this.hovered.draw(this.ctx, { fill: true })
		}
		if (this.selected) {
			this.selected.draw(this.ctx, { outline: true })
		}
	}
}
