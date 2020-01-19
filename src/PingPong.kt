import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLCanvasElement
import kotlin.browser.document

const val GAME_WIDTH = 800.0
const val GAME_HEIGHT = 600.0

fun main() {
    val canvas = document.getElementById("canvas") as HTMLCanvasElement
    val context = canvas.getContext("2d") as CanvasRenderingContext2D
    val game = Game(context)
    //game.start()
}


