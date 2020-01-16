if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'PingPong'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'PingPong'.");
}
var PingPong = function (_, Kotlin) {
  'use strict';
  var Unit = Kotlin.kotlin.Unit;
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  function Game(context) {
    this.context_0 = context;
    this.paddle_0 = new Paddle(this.context_0);
    this.timer_0 = 0;
    window.addEventListener('keydown', Game_init$lambda(this));
    window.addEventListener('keyup', Game_init$lambda_0(this));
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
      this.timer_0 = window.setInterval(Game$start$lambda(this), 10);
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
    this.paddle_0.update();
  };
  Game.prototype.draw_0 = function () {
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
    this.width_0 = 100.0;
    this.height_0 = 20.0;
    this.x_0 = (GAME_WIDTH - this.width_0) / 2;
    this.y_0 = GAME_HEIGHT - this.height_0 - 10;
    this.maxSpeed_0 = 10.0;
    this.speed = 0.0;
  }
  Paddle.prototype.update = function () {
    this.x_0 += this.speed;
    if (this.x_0 < 0)
      this.x_0 = 0.0;
    else if (this.x_0 + this.width_0 > GAME_WIDTH)
      this.x_0 = GAME_WIDTH - this.width_0;
  };
  Paddle.prototype.draw = function () {
    this.context_0.fillRect(this.x_0, this.y_0, this.width_0, this.height_0);
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
