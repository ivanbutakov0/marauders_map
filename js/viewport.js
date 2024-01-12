class Viewport {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = this.canvas.getContext('2d')

		this.#addEventListener()
	}
	#addEventListener() {
		this.canvas.addEventListener('scroll', e => {
			console.log(e)
		})
	}
}
