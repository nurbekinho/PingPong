import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.PI

class Ball(private val context: CanvasRenderingContext2D) {
    val radius = 10.0
    var x = (GAME_WIDTH - radius) / 2
    var y = (GAME_HEIGHT - radius) / 2
    var xSpeed = 1
    var ySpeed = 1

    fun update() {
        x += xSpeed
        y += ySpeed

        if (x + radius > GAME_WIDTH || x - radius < 0) {
            xSpeed *= -1
        }

        if (y - radius <= 0) {
            //println("user won")
            ySpeed *= -1
        } else if (y + radius >= GAME_HEIGHT) {
            //println("computer won")
            ySpeed *= -1
        }
    }

    fun draw() {
        context.beginPath();
        context.arc(x, y, radius, 0.0, 2 * PI)
        context.stroke();
    }
}
