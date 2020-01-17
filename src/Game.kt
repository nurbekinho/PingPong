import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.window

class Game(private val context: CanvasRenderingContext2D) {
    private val paddle: Paddle = Paddle(context)
    private val ball: Ball = Ball(context)
    private var timer: Int = 0

    init {
        window.addEventListener("keydown", {onKeyDown(it)})
        window.addEventListener("keyup", {onKeyUp(it)})
    }

    fun start() {
        if (timer == 0) {
            stop()
            timer = window.setInterval({ loop() }, 5)
            //loop()
        }
    }

    private fun stop() {
        if (timer > 0) {
            window.clearInterval(timer)
            timer = 0
        }
    }

    private fun loop() {
        context.clearRect(0.0, 0.0, GAME_WIDTH, GAME_HEIGHT)
        update()
        draw()

        //window.requestAnimationFrame { run { loop() } }
    }

    private fun update() {
        ball.update()
        paddle.update()
    }

    private fun draw() {
        paddle.draw()
        ball.draw()
    }

    private fun onKeyDown(event: Event) {
        val keyboardEvent = event as KeyboardEvent
        when (keyboardEvent.keyCode) {
            37 -> paddle.moveLeft()
            39 -> paddle.moveRight()
        }
    }

    private fun onKeyUp(event: Event) {
        val keyboardEvent = event as KeyboardEvent
        when (keyboardEvent.keyCode) {
            37 -> {
                if (paddle.speed < 0) paddle.stop()
            }
            39 -> {
                if (paddle.speed > 0) paddle.stop()
            }
        }
    }
}
