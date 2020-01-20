import org.w3c.dom.CanvasRenderingContext2D

class Paddle(private val context: CanvasRenderingContext2D) {
    val width = 100.0
    val height = 20.0
    var x = (GAME_WIDTH - width) / 2
    var y = GAME_HEIGHT - height - 10
    private var maxSpeed = 5.0
    var speed = 0.0

    fun update() {
        x += speed

        if (x < 0) x = 0.0
        else if (x + width > GAME_WIDTH) x = GAME_WIDTH - width
    }

    fun draw() {
        context.fillRect(x, y, width, height)
    }

    fun moveLeft() {
        speed = -maxSpeed
    }

    fun moveRight() {
        speed = maxSpeed
    }

    fun stop() {
        speed = 0.0
    }
}
