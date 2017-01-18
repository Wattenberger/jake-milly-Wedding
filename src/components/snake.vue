<template>
  <div class="snake">
    <div class="snake__overlay"
         v-if="!playing"
         :style="{height: `${height}px`, width: `${width}px`}">
      <div v-if="record">
        <h6>Last game: {{ score }}</h6>
        <h6>Record: {{ record }}</h6>
      </div>
      <h6 v-if="!record">Play snake</h6>
      <button v-on:click="startNewGame">New Game (Enter)</button>
    </div>
    <canvas ref="canvas" :height="height" :width="width" />
  </div>
</template>

<script>
  import _ from "lodash"
  import {canvasUtils} from "./utils/canvasUtils"
  import {KEYS} from "./utils/keys"
  import "./snake.less"

  let animationRequestId
  const INTERVAL_LENGTH = 40
  const SNAKE_STARTING_LENGTH = 6
  const CANVAS_RGB = "240, 240, 244"
  const SNAKE_RGB = "153, 199, 137"
  const TARGET_RGB = "211, 125, 78"

  let component = {
    mounted: function() {
      let {height, width} = this
      window.addEventListener("keydown", this.onKeydown)
      window.addEventListener("resize", this.onResize)

      let canvas = this.$refs.canvas.getContext("2d")
      _.extend(this, {canvas})

      canvasUtils.fadeCanvas(1, canvas, CANVAS_RGB, {
        height, width
      })
      this.draw()
    },
    data() {
      return {
        height: window.innerHeight,
        width: window.innerWidth,
        keypresses: {
          [KEYS.LEFT]: this.changeDir.bind(this, {x: -1, y: 0}),
          [KEYS.RIGHT]: this.changeDir.bind(this, {x: 1, y: 0}),
          [KEYS.UP]: this.changeDir.bind(this, {x: 0, y: -1}),
          [KEYS.DOWN]: this.changeDir.bind(this, {x: 0, y: 1}),
          [KEYS.ENTER]: this.startNewGame,
        },
        canvas: null,
        snake: null,
        target: null,
        hasDrawnAfterDirChange: false,
        history: [],
        playing: true,
        score: null,
        record: null,
      }
    },
    computed: {
        WIDTH_PXS: function() {
          return Math.floor(this.width / 20)
        },
        TILE_PX: function() {
          return this.width / this.WIDTH_PXS
        },
        HEIGHT_PXS: function() {
          return Math.floor(this.height / this.TILE_PX)
        },
        BOARD_CENTER: function() {
          return {
            x: Math.floor(this.WIDTH_PXS / 2),
            y: Math.floor(this.HEIGHT_PXS / 2),
          }
        },
    },
    methods: {
      onResize: function() {
        let newVars = {
          height: window.innerHeight,
          width: window.innerWidth,
        }
        _.extend(this, newVars)
      },

      startNewGame: function() {
        let {playing} = this
        if (playing) return
        
        _.extend(this, {
          snake: null,
          target: null,
          history: [],
          playing: true,
        })
        setTimeout(() => {
          this.draw()
        })
      },

      endGame: function() {
        let {snake, record} = this

        let score = snake.length - SNAKE_STARTING_LENGTH
        record = Math.max(score, record)
        _.extend(this, {
          score,
          record,
          playing: false
        })
      },

      changeDir: function(dir, e) {
        e.preventDefault()

        let {hasDrawnAfterDirChange, playing, snake} = this
        if (!playing || !hasDrawnAfterDirChange) return

        const checkAxis = (axis) => Math.abs(dir[axis] - snake.dir[axis]) > 1
        if (checkAxis("x") || checkAxis("y")) return

        snake.dir = dir
        hasDrawnAfterDirChange = false
        _.extend(this, {snake, hasDrawnAfterDirChange})
      },

      onKeydown: function(e) {
        let pressedKey = e.keyCode
        let method = this.keypresses[pressedKey]
        if (method) method(e)
      },

      draw: function() {
        let {width, height, canvas, playing} = this
        if (!playing) return

        if (canvas) {
          canvasUtils.fadeCanvas(1, canvas, CANVAS_RGB, {
            width, height
          })
          this.drawTarget()
          this.drawSnake()
          _.extend(this, {hasDrawnAfterDirChange: true})
        }

        animationRequestId = setTimeout(() => {window.requestAnimationFrame(this.draw)}, INTERVAL_LENGTH)
      },

      createSnake: function() {
        return {
          length: SNAKE_STARTING_LENGTH,
          dir: {x: 1, y: 0},
          pos: this.BOARD_CENTER,
        }
      },

      interpPos: function (p1, p2) {
        let {width, height} = this
        let interpPlane = (dimension, bound) => {
          let newPoint = (p1[dimension] + p2[dimension]) % bound
          if (newPoint < 0) newPoint = bound + newPoint
          return newPoint
        }
        return {
          x: interpPlane("x", Math.floor(width / this.TILE_PX)),
          y: interpPlane("y", Math.floor(height / this.TILE_PX)),
        }
      },

      drawSnake: function () {
        let {width, height, canvas, snake, history, target, points} = this
        if (!snake) snake = this.createSnake()

        let newPos = this.interpPos(snake.pos, snake.dir)
        _.extend(snake.pos, newPos)

        // Eat?
        if (newPos.x == target.x && newPos.y == target.y) {
          target = this.createTarget()
          snake.length++
        }

        // Die?
        if (_.find(history, historyPoint => historyPoint.x == newPos.x && historyPoint.y == newPos.y)) {
          this.endGame()
        }

        history.unshift(newPos)
        history = history.splice(0, snake.length)
        _.map(history, historyPoint => {
          this.drawPx(historyPoint, SNAKE_RGB)
        })

        _.extend(this, {snake, history, target, points})
      },

      drawPx: function(pos, rgb, style="fill") {
        let {canvas} = this

        canvas[`${style}Style`] = `rgb(${rgb})`
        canvas[`${style}Rect`](
          pos.x * this.TILE_PX - 1,
          pos.y * this.TILE_PX - 1,
          this.TILE_PX + 1,
          this.TILE_PX + 1,
        )
      },

      drawCircle: function(pos, rgb, style="fill") {
        let {canvas} = this

        canvas.lineWidth = 2.5
        let halfTile = this.TILE_PX / 2
        canvasUtils.drawDot({
          x: pos.x * this.TILE_PX + halfTile,
          y: pos.y * this.TILE_PX + halfTile,
          r: this.TILE_PX * 0.35,
        }, canvas, `rgb(${rgb})`, style)
      },

      createTarget: function() {
        return {
          x: _.random(this.WIDTH_PXS - 1),
          y: _.random(this.HEIGHT_PXS - 1),
        }
      },

      drawTarget: function() {
        let {canvas, target} = this
        if (!target) target = this.createTarget()

        // this.drawPx(target, TARGET_RGB, "stroke")
        this.drawCircle(target, TARGET_RGB, "stroke")
        _.extend(this, {target})
      },

      getGameOverlayStyle: function() {
        return {
          width: `${BOARD_WIDTH}px`,
          height: `${BOARD_WIDTH}px`,
        }
      },
    },
    destroyed: function() {
      window.removeEventListener("keydown", this.onKeydown)
      window.cancelAnimationFrame(animationRequestId)
    }
  }

  export default component
</script>
