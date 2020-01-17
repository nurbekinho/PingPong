import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.PI

class Ball(private val context: CanvasRenderingContext2D) {
    private val radius = 10.0
    private var x = (GAME_WIDTH - radius) / 2
    private var y = (GAME_HEIGHT - radius) / 2
    private var xSpeed = 1
    private var ySpeed = 1

    fun update() {
        x += xSpeed
        y += ySpeed

        if (x + radius > GAME_WIDTH || x - radius < 0) {
            xSpeed *= -1
        }

        if (y + radius > GAME_HEIGHT || y - radius < 0) {
            ySpeed *= -1
        }
    }

    fun draw() {
        context.beginPath();
        context.arc(x, y, radius, 0.0, 2 * PI)
        context.stroke();
    }
}
