if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'PingPong'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'PingPong'.");
}
var PingPong = function (_, Kotlin) {
  'use strict';
  var math = Kotlin.kotlin.math;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var Math_0 = Math;
  var Kind_OBJECT = Kotlin.Kind.OBJECT;
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  function Ball(context) {
    this.context_0 = context;
    this.radius = 10.0;
    this.x = (GAME_WIDTH - this.radius) / 2;
    this.y = (GAME_HEIGHT - this.radius) / 2;
    this.xSpeed = 1;
    this.ySpeed = 1;
  }
  Ball.prototype.update = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    if (this.x + this.radius > GAME_WIDTH || this.x - this.radius < 0) {
      this.xSpeed = this.xSpeed * -1 | 0;
    }
    if (this.y + this.radius > GAME_HEIGHT || this.y - this.radius < 0) {
      this.ySpeed = this.ySpeed * -1 | 0;
    }
  };
  Ball.prototype.draw = function () {
    this.context_0.beginPath();
    this.context_0.arc(this.x, this.y, this.radius, 0.0, 2 * math.PI);
    this.context_0.stroke();
  };
  Ball.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Ball',
    interfaces: []
  };
  function CollisionController(ball, userPaddle) {
    this.ball_0 = ball;
    this.userPaddle_0 = userPaddle;
  }
  CollisionController.prototype.update = function () {
    var tmp$, tmp$_0, tmp$_1;
    if (this.ball_0.y <= this.userPaddle_0.y) {
      if (this.ball_0.x > this.userPaddle_0.x && this.ball_0.x < this.userPaddle_0.x + this.userPaddle_0.width && this.ball_0.y + this.ball_0.radius >= this.userPaddle_0.y) {
        tmp$ = this.ball_0;
        tmp$.ySpeed = tmp$.ySpeed * -1 | 0;
      }
       else if (this.ball_0.x <= this.userPaddle_0.x) {
        var $receiver = this.ball_0.x - this.userPaddle_0.x;
        var tmp$_2 = Math_0.pow($receiver, 2);
        var $receiver_0 = this.ball_0.y - this.userPaddle_0.y;
        var tmp$_3 = tmp$_2 + Math_0.pow($receiver_0, 2);
        var $receiver_1 = this.ball_0.radius;
        if (tmp$_3 <= Math_0.pow($receiver_1, 2)) {
          this.ball_0.xSpeed = -1;
          tmp$_0 = this.ball_0;
          tmp$_0.ySpeed = tmp$_0.ySpeed * -1 | 0;
        }
      }
       else if (this.ball_0.x >= this.userPaddle_0.x + this.userPaddle_0.width) {
        var $receiver_2 = this.userPaddle_0.x + this.userPaddle_0.width - this.ball_0.x;
        var tmp$_4 = Math_0.pow($receiver_2, 2);
        var $receiver_3 = this.userPaddle_0.y - this.ball_0.y;
        var tmp$_5 = tmp$_4 + Math_0.pow($receiver_3, 2);
        var $receiver_4 = this.ball_0.radius;
        if (tmp$_5 <= Math_0.pow($receiver_4, 2) + 50) {
          this.ball_0.xSpeed = 1;
          tmp$_1 = this.ball_0;
          tmp$_1.ySpeed = tmp$_1.ySpeed * -1 | 0;
        }
      }
    }
  };
  CollisionController.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'CollisionController',
    interfaces: []
  };
  function Game(context) {
    Game$Companion_getInstance();
    this.context_0 = context;
    this.state = Game$Companion_getInstance().INTRO;
    this.paddle_0 = new Paddle(this.context_0);
    this.ball_0 = new Ball(this.context_0);
    this.collisionController_0 = new CollisionController(this.ball_0, this.paddle_0);
    this.timer_0 = 0;
    window.addEventListener('keydown', Game_init$lambda(this));
    window.addEventListener('keyup', Game_init$lambda_0(this));
  }
  function Game$Companion() {
    Game$Companion_instance = this;
    this.INTRO = 'intro';
    this.PLAYING = 'playing';
    this.PAUSED = 'paused';
    this.FINISHED = 'finished';
  }
  Game$Companion.$metadata$ = {
    kind: Kind_OBJECT,
    simpleName: 'Companion',
    interfaces: []
  };
  var Game$Companion_instance = null;
  function Game$Companion_getInstance() {
    if (Game$Companion_instance === null) {
      new Game$Companion();
    }
    return Game$Companion_instance;
  }
  function Game$start$lambda(this$Game) {
    return function () {
      this$Game.loop_0();
      return Unit;
    };
  }
  Game.prototype.start = function () {
    if (this.timer_0 === 0) {
      this.stop_0();
      this.state = Game$Companion_getInstance().PLAYING;
      this.timer_0 = window.setInterval(Game$start$lambda(this), 5);
    }
  };
  Game.prototype.stop_0 = function () {
    if (this.timer_0 > 0) {
      window.clearInterval(this.timer_0);
      this.timer_0 = 0;
    }
  };
  Game.prototype.loop_0 = function () {
    this.context_0.clearRect(0.0, 0.0, GAME_WIDTH, GAME_HEIGHT);
    this.update_0();
    this.draw_0();
  };
  Game.prototype.update_0 = function () {
    this.ball_0.update();
    this.paddle_0.update();
    this.collisionController_0.update();
  };
  Game.prototype.draw_0 = function () {
    this.ball_0.draw();
    this.paddle_0.draw();
  };
  Game.prototype.onKeyDown_0 = function (event) {
    var tmp$;
    var keyboardEvent = Kotlin.isType(tmp$ = event, KeyboardEvent) ? tmp$ : throwCCE();
    switch (keyboardEvent.keyCode) {
      case 37:
        this.paddle_0.moveLeft();
        break;
      case 39:
        this.paddle_0.moveRight();
        break;
    }
  };
  Game.prototype.onKeyUp_0 = function (event) {
    var tmp$;
    var keyboardEvent = Kotlin.isType(tmp$ = event, KeyboardEvent) ? tmp$ : throwCCE();
    switch (keyboardEvent.keyCode) {
      case 37:
        if (this.paddle_0.speed < 0)
          this.paddle_0.stop();
        break;
      case 39:
        if (this.paddle_0.speed > 0)
          this.paddle_0.stop();
        break;
    }
  };
  function Game_init$lambda(this$Game) {
    return function (it) {
      this$Game.onKeyDown_0(it);
      return Unit;
    };
  }
  function Game_init$lambda_0(this$Game) {
    return function (it) {
      this$Game.onKeyUp_0(it);
      return Unit;
    };
  }
  Game.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Game',
    interfaces: []
  };
  function Paddle(context) {
    this.context_0 = context;
    this.width = 100.0;
    this.height = 20.0;
    this.x = (GAME_WIDTH - this.width) / 2;
    this.y = GAME_HEIGHT - this.height - 10;
    this.maxSpeed_0 = 5.0;
    this.speed = 0.0;
  }
  Paddle.prototype.update = function () {
    this.x += this.speed;
    if (this.x < 0)
      this.x = 0.0;
    else if (this.x + this.width > GAME_WIDTH)
      this.x = GAME_WIDTH - this.width;
  };
  Paddle.prototype.draw = function () {
    this.context_0.fillRect(this.x, this.y, this.width, this.height);
  };
  Paddle.prototype.moveLeft = function () {
    this.speed = -this.maxSpeed_0;
  };
  Paddle.prototype.moveRight = function () {
    this.speed = this.maxSpeed_0;
  };
  Paddle.prototype.stop = function () {
    this.speed = 0.0;
  };
  Paddle.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Paddle',
    interfaces: []
  };
  var GAME_WIDTH;
  var GAME_HEIGHT;
  function main() {
    var tmp$, tmp$_0;
    var canvas = Kotlin.isType(tmp$ = document.getElementById('canvas'), HTMLCanvasElement) ? tmp$ : throwCCE();
    var context = Kotlin.isType(tmp$_0 = canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$_0 : throwCCE();
    var game = new Game(context);
    game.start();
  }
  _.Ball = Ball;
  _.CollisionController = CollisionController;
  Object.defineProperty(Game, 'Companion', {
    get: Game$Companion_getInstance
  });
  _.Game = Game;
  _.Paddle = Paddle;
  Object.defineProperty(_, 'GAME_WIDTH', {
    get: function () {
      return GAME_WIDTH;
    }
  });
  Object.defineProperty(_, 'GAME_HEIGHT', {
    get: function () {
      return GAME_HEIGHT;
    }
  });
  _.main = main;
  GAME_WIDTH = 800.0;
  GAME_HEIGHT = 600.0;
  main();
  Kotlin.defineModule('PingPong', _);
  return _;
}(typeof PingPong === 'undefined' ? {} : PingPong, kotlin);
