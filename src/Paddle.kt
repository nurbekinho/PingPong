import org.w3c.dom.CanvasRenderingContext2D

class Paddle(private val context: CanvasRenderingContext2D) {
    private val width = 100.0
    private val height = 20.0
    private var x = (GAME_WIDTH - width) / 2
    private var y = GAME_HEIGHT - height - 10
    private val speed = 10

    fun update() {
        if (x < 0) x = 0.0
        else if (x + width > GAME_WIDTH) x = GAME_WIDTH - width
    }

    fun draw() {
        context.fillRect(x, y, width, height)
    }

    fun moveLeft() {
        x -= speed
    }

    fun moveRight() {
        x += speed
    }

    fun stop() {

    }
}
