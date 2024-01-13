class Viewport {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		this.zoom = 1

		this.#addEventListener()
	}

	getMouse(e) {
		return new Node(e.offsetX / this.zoom, e.offsetY / this.zoom)
	}
	#addEventListener() {
		this.canvas.addEventListener('wheel', this.#handleMouseWheel.bind(this))
	}

	#handleMouseWheel(e) {
		if (e.wheelDeltaY > 0 && this.zoom < 3) {
			this.zoom += 0.1
		} else if (e.wheelDeltaY < 0 && this.zoom > 0.5) {
			this.zoom -= 0.1
		}
	}
}
