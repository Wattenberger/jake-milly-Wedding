<template>
  <div class="app">
    <!-- <div class="background" v-if="!isMobile">
    </div> -->
    <div class="title">
      <div class="background"></div>
      <div class="title-content">
        <img class="img" :src="image" alt="" />
        <h1>Jake & Milly</h1>
        <h6>8.26.2017 - Stern Grove, San Francisco</h6>
        <countdown />
        <button v-on:click="scrollToBottom">Rsvp here</button>
      </div>
      <!-- <div class="title__more-info">More information coming soon.<span v-if="isMobile"> View on desktop to play a game.</span></div> -->
      <!-- <arrowkeys v-if="!isMobile" /> -->
    </div>
    <div class="content">
      <!-- <data-viz-or-story /> -->
      <venue />
      <!-- <sf /> -->
      <rsvp />
      <!-- <honeyfund /> -->
      <!-- <event-schedule /> -->
      <!-- <travel-accomodation /> -->
      <!-- <registry /> -->
      <!-- <questions /> -->
      <snake-teaser />
    </div>
  </div>
</template>

<script>
import {KEYS} from "./utils/keys"
import jakemilly from "./../images/jakemilly.png"
import questions from "./questions.vue"
import countdown from "./countdown.vue"
// import arrowkeys from "./arrowkeys.vue"
import venue from "./venue.vue"
import sf from "./sf.vue"
import rsvp from "./rsvp.vue"
import honeyfund from "./honeyfund.vue"
import snakeTeaser from "./snake-teaser.vue"
import {isMobile} from "./utils/utils"
import "./app.less"

// const snakeKeys = ["LEFT", "RIGHT", "UP", "DOWN", "ENTER"].map(key => KEYS[key])
// const cancelKeys = ["ESC"].map(key => KEYS[key])

export default {
  mounted: function() {
    // window.addEventListener("keydown", this.onKeydown)
    this.isMobile = isMobile()
  },
  data () {
    return {
      isMobile: false,
      // playing: false,
      image: jakemilly
    }
  },
  methods: {
    easeInOutQuad: function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    },
    scrollTo: function(element, to, duration) {
      var start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20,
          ctrl = this;
          
      var animateScroll = function() {        
          currentTime += increment;
          var val = ctrl.easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if(currentTime < duration) {
              setTimeout(animateScroll, increment);
          }
      };
      animateScroll();
    },
    scrollToBottom: function() {
      this.scrollTo(document.body, document.documentElement.scrollHeight, 1000)
    }
  },
  components: {
    questions,
    countdown,
    // arrowkeys,
    // snake,
    venue,
    sf,
    rsvp,
    honeyfund,
    snakeTeaser,
  },
  destroyed: function() {
    // window.removeEventListener("keydown", this.onKeydown)
    // window.cancelAnimationFrame(animationRequestId)
  }
}
</script>

<style>
</style>
