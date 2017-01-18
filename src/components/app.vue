<template>
  <div class="app" :class="{ playing }">
    <div class="background">
      <snake />
    </div>
    <div class="title">
      <img class="img" :src="image" alt="" />
      <h1>Jake & Milly</h1>
      <h6>8.26.2017 - Stern Grove, San Francisco</h6>
      <countdown />
      <div class="title__more-info">More information coming soon</div>
    </div>
    <!-- <div class="content"> -->
      <!-- <p>More information coming soon.</p> -->
      <!-- <data-viz-or-story /> -->
      <!-- <questions /> -->
      <!-- <places-to-stay /> -->
      <!-- <wedding-party /> -->
      <!-- <event-schedule /> -->
      <!-- <things-to-do-around-town /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import {KEYS} from "./utils/keys"
import jakemilly from "./../images/jakemilly.png"
import questions from "./questions.vue"
import countdown from "./countdown.vue"
import snake from "./snake.vue"
import "./app.less"

const snakeKeys = ["LEFT", "RIGHT", "UP", "DOWN", "ENTER"].map(key => KEYS[key])
const cancelKeys = ["ESC"].map(key => KEYS[key])
export default {
  mounted: function() {
    window.addEventListener("keydown", this.onKeydown)
  },
  data () {
    return {
      playing: false,
      image: jakemilly
    }
  },
  methods: {
    onKeydown: function(e) {
      let pressedKey = e.keyCode
      if (snakeKeys.indexOf(pressedKey) != -1) {
        this.playing = true
      } else if (cancelKeys.indexOf(pressedKey) != -1) {
        this.playing = false
      }
    }
  },
  components: {
    questions,
    countdown,
    snake,
  },
  destroyed: function() {
    window.removeEventListener("keydown", this.onKeydown)
    window.cancelAnimationFrame(animationRequestId)
  }
}
</script>

<style>
</style>
