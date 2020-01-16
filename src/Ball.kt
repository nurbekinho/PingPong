import org.w3c.dom.CanvasRenderingContext2D
import kotlin.math.PI

class Ball(private val context: CanvasRenderingContext2D) {
    private val radius = 5.0
    private var x = (GAME_WIDTH - radius) / 2
    private var y = (GAME_HEIGHT - radius) / 2

    fun update() {

    }

    fun draw() {
        context.beginPath();
        context.arc(x, y, radius, 0.0, 2 * PI);
        context.stroke();
    }
}
