import kotlin.math.pow

class CollisionController(private val ball: Ball, private val userPaddle: Paddle) {
    fun update() {
        if (ball.y <= userPaddle.y) {
            if (ball.x > userPaddle.x && ball.x < userPaddle.x + userPaddle.width && ball.y + ball.radius >= userPaddle.y) {
                ball.ySpeed *= -1
            } else if (ball.x <= userPaddle.x) {
                if ((ball.x - userPaddle.x).pow(2) + (ball.y - userPaddle.y).pow(2) <= ball.radius.pow(2)) {
                    ball.xSpeed = -1
                    ball.ySpeed *= -1
                }
            } else if (ball.x >= userPaddle.x + userPaddle.width) {
                if ((userPaddle.x + userPaddle.width - ball.x).pow(2) + (userPaddle.y - ball.y).pow(2) <= ball.radius.pow(2) + 50) {
                    ball.xSpeed = 1
                    ball.ySpeed *= -1
                }
            }
        }
    }
}
