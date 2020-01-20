import org.w3c.dom.CENTER
import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.CanvasTextAlign
import org.w3c.dom.events.Event
import org.w3c.dom.events.KeyboardEvent
import kotlin.browser.window

class Game(private val context: CanvasRenderingContext2D) {
    companion object {
        const val INTRO = "intro"
        const val PLAYING = "playing"
        const val PAUSED = "paused"
        const val FINISHED = "finished"
    }

    var state = ""
    private val paddle: Paddle = Paddle(context)
    private var aiPaddle = Paddle(context)
    private val ball: Ball = Ball(context)
    private val collisionController: CollisionController = CollisionController(ball, aiPaddle, paddle)
    private val aiController: AIController = AIController(ball, aiPaddle)
    private var timer: Int = 0

    init {
        window.addEventListener("keydown", {onKeyDown(it)})
        window.addEventListener("keyup", {onKeyUp(it)})
        aiPaddle.y = 10.0

        intro()
    }

    private fun intro() {
        state = INTRO

        context.font = "30px Arial"
        context.fillStyle = "black"
        context.textAlign = CanvasTextAlign.CENTER
        context.fillText(
                "Press [Space Bar] To Start The Game",
                GAME_WIDTH / 2,
                GAME_HEIGHT / 2
        )
    }

    private fun start() {
        if (timer == 0) {
            stop()
            state = PLAYING
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
        aiPaddle.update()
        aiController.update()
        collisionController.update()
    }

    private fun draw() {
        ball.draw()
        aiPaddle.draw()
        paddle.draw()
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
            32 -> {
                if (state == INTRO) start()
            }
        }
    }
}
