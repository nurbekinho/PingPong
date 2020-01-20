class AIController(private val ball: Ball, private val aiPaddle: Paddle) {
    fun update() {
        if (ball.ySpeed < 0) {
            if (ball.x > aiPaddle.x + aiPaddle.width / 2) aiPaddle.moveRight()
            else aiPaddle.moveLeft()
        } else {
            aiPaddle.stop()
        }
    }
}
