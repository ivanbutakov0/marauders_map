class Viewport {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		this.zoom = 1

		this.center = new Node(canvas.width / 2, canvas.height / 2)
		this.offset = scale(this.center, -1)

		this.drag = {
			start: new Node(0, 0),
			end: new Node(0, 0),
			offset: new Node(0, 0),
			active: false,
		}

		this.#addEventListener()
	}

	reset() {
		this.ctx.restore()
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
		this.ctx.save()
		this.ctx.translate(this.center.x, this.center.y)
		this.ctx.scale(this.zoom, this.zoom)
		const offset = this.getOffset()
		this.ctx.translate(offset.x, offset.y)
	}

	getMouse(e, subtractDragOffset = false) {
		const node = new Node(
			(e.offsetX - this.center.x) / this.zoom - this.offset.x,
			(e.offsetY - this.center.y) / this.zoom - this.offset.y
		)
		return subtractDragOffset ? subtract(node, this.drag.offset) : node
	}

	getOffset() {
		return add(this.offset, this.drag.offset)
	}

	#addEventListener() {
		this.canvas.addEventListener('wheel', this.#handleMouseWheel.bind(this))
		this.canvas.addEventListener('mousedown', this.#handleMouseDown.bind(this))
		this.canvas.addEventListener('mousemove', this.#handleMouseMove.bind(this))
		this.canvas.addEventListener('mouseup', this.#handleMouseUp.bind(this))
	}

	#handleMouseWheel(e) {
		if (e.wheelDeltaY > 0 && this.zoom < 3) {
			this.zoom += 0.1
		} else if (e.wheelDeltaY < 0 && this.zoom > 0.5) {
			this.zoom -= 0.1
		}
	}

	#handleMouseDown(e) {
		// check if middle button
		if (e.button === 1) {
			this.drag.active = true
			this.drag.start = this.getMouse(e)
		}
	}

	#handleMouseMove(e) {
		if (this.drag.active) {
			this.drag.end = this.getMouse(e)
			this.drag.offset = subtract(this.drag.end, this.drag.start)
		}
	}

	#handleMouseUp(e) {
		if (e.button === 1) {
			this.offset = add(this.offset, this.drag.offset)
			this.drag = {
				start: new Node(0, 0),
				end: new Node(0, 0),
				offset: new Node(0, 0),
				active: false,
			}
		}
	}
}
